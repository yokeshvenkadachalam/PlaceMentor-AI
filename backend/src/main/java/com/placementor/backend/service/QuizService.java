package com.placementor.backend.service;

import com.placementor.backend.entity.Category;
import com.placementor.backend.entity.Difficulty;
import com.placementor.backend.entity.Topic;

import com.placementor.backend.repository.CategoryRepository;
import com.placementor.backend.repository.TopicRepository;
import com.placementor.backend.repository.QuestionRepository;
import com.placementor.backend.repository.QuizAttemptRepository;
import com.placementor.backend.repository.QuizAnswerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.placementor.backend.dto.QuestionResponse;
import com.placementor.backend.dto.QuizStartRequest;
import com.placementor.backend.dto.QuizStartResponse;
import com.placementor.backend.entity.Question;
import com.placementor.backend.dto.QuizResultResponse;
import com.placementor.backend.dto.QuizSubmitRequest;
import com.placementor.backend.dto.ReportResponse;
import com.placementor.backend.dto.TopicPerformance;

import com.placementor.backend.entity.QuizAttempt;
import com.placementor.backend.entity.Student;
import com.placementor.backend.repository.StudentRepository;

import com.placementor.backend.entity.QuizAnswer;
import com.placementor.backend.dto.QuizHistoryResponse;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.time.LocalDateTime;
import com.placementor.backend.dto.LeaderboardResponse;
import com.placementor.backend.dto.NotificationResponse;

import java.util.Comparator;

import java.util.Collections;

import java.util.List;

@Service
public class QuizService {

    /* ==========================================
       REPOSITORIES
    ========================================== */

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private QuizAnswerRepository quizAnswerRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private AchievementService achievementService;
    @Autowired
    private LevelService levelService;
    @Autowired
    private DailyChallengeService dailyChallengeService;
    @Autowired
    private StreakService streakService;

    /* ==========================================
       GET ALL ACTIVE CATEGORIES
    ========================================== */

    public List<Category> getCategories() {

        return categoryRepository.findByActiveTrue();

    }

    /* ==========================================
       GET TOPICS BY CATEGORY
    ========================================== */

    public List<Topic> getTopics(Long categoryId) {

        Category category =
                categoryRepository.findById(categoryId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Category not found."
                                )
                        );

        return topicRepository.findByCategoryAndActiveTrue(
                category
        );

    }
    /* ==========================================
   START QUIZ
========================================== */

public QuizStartResponse startQuiz(
        QuizStartRequest request
) {

    Category category = categoryRepository.findById(
            request.getCategoryId()
    ).orElseThrow(() ->
            new RuntimeException("Category not found.")
    );

    Topic topic = topicRepository.findById(
            request.getTopicId()
    ).orElseThrow(() ->
            new RuntimeException("Topic not found.")
    );

    List<Question> questions =
            questionRepository
                    .findByCategoryAndTopicAndDifficultyAndActiveTrue(
                            category,
                            topic,
                            request.getDifficulty()
                    );

    if (questions.isEmpty()) {

        throw new RuntimeException(
                "No questions found."
        );

    }

    Collections.shuffle(questions);

    int limit = Math.min(
            request.getNumberOfQuestions(),
            questions.size()
    );

    List<QuestionResponse> quizQuestions =
            questions
                    .subList(0, limit)
                    .stream()
                    .map(this::convertToResponse)
                    .toList();

    QuizStartResponse response =
            new QuizStartResponse();

    response.setCategoryId(
            category.getId()
    );

    response.setCategoryName(
            category.getName()
    );

    response.setTopicId(
            topic.getId()
    );

    response.setTopicName(
            topic.getName()
    );

    response.setDifficulty(
            request.getDifficulty().name()
    );

    response.setTotalQuestions(
            quizQuestions.size()
    );

    response.setQuestions(
            quizQuestions
    );

    return response;

}
/* ==========================================
   SUBMIT QUIZ (PART 3.1)
========================================== */

public QuizResultResponse submitQuiz(
        String email,
        QuizSubmitRequest request
) {

    Student student =
            studentRepository.findByUser_Email(email)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Student not found."
                            )
                    );

    Category category =
            categoryRepository.findById(
                    request.getCategoryId()
            ).orElseThrow(() ->
                    new RuntimeException(
                            "Category not found."
                    )
            );

    Topic topic =
            topicRepository.findById(
                    request.getTopicId()
            ).orElseThrow(() ->
                    new RuntimeException(
                            "Topic not found."
                    )
            );

    QuizAttempt attempt =
            new QuizAttempt();

    attempt.setStudent(student);

    attempt.setCategory(category);

    attempt.setTopic(topic);

    attempt.setDifficulty(

            Difficulty.valueOf(

                    request.getDifficulty()

            )

    );

    attempt.setStartedAt(

            LocalDateTime.now()

    );

    attempt.setCompletedAt(

            LocalDateTime.now()

    );

    attempt.setTimeTaken(

            request.getTimeTaken()

    );

    // Part 3.2 continues here...

    /* ==========================================
   PROCESS ANSWERS
========================================== */

int totalQuestions = request.getAnswers().size();

int correctAnswers = 0;
int wrongAnswers = 0;
int unanswered = 0;

int totalMarks = 0;
int obtainedMarks = 0;

List<QuizAnswer> quizAnswers = new ArrayList<>();

for (QuizSubmitRequest.Answer submittedAnswer : request.getAnswers()) {

    Question question =
            questionRepository.findById(
                    submittedAnswer.getQuestionId()
            ).orElseThrow(() ->
                    new RuntimeException(
                            "Question not found."
                    )
            );

    totalMarks += question.getMarks();

    String selectedAnswer =
            submittedAnswer.getSelectedAnswer();

    QuizAnswer quizAnswer =
            new QuizAnswer();

    quizAnswer.setAttempt(attempt);

    quizAnswer.setQuestion(question);

    quizAnswer.setCorrectAnswer(
            question.getCorrectAnswer()
    );

    if (selectedAnswer == null || selectedAnswer.isBlank()) {

        unanswered++;

        quizAnswer.setSelectedAnswer(null);

        quizAnswer.setIsCorrect(false);

        quizAnswer.setMarks(0);

    }
    else {

        quizAnswer.setSelectedAnswer(selectedAnswer);

        boolean correct =
                question.getCorrectAnswer()
                        .equalsIgnoreCase(selectedAnswer);

        quizAnswer.setIsCorrect(correct);

        if (correct) {

            correctAnswers++;

            obtainedMarks += question.getMarks();

            quizAnswer.setMarks(
                    question.getMarks()
            );

        }
        else {

            wrongAnswers++;

            quizAnswer.setMarks(0);

        }

    }

    quizAnswers.add(quizAnswer);

}
/* ==========================================
   CALCULATE RESULT
========================================== */

double percentage = 0.0;

if (totalMarks > 0) {

    percentage =
            ((double) obtainedMarks / totalMarks) * 100.0;

}

/* ==========================================
   SAVE QUIZ ATTEMPT
========================================== */

attempt.setTotalQuestions(
        totalQuestions
);

attempt.setCorrectAnswers(
        correctAnswers
);

attempt.setWrongAnswers(
        wrongAnswers
);

attempt.setUnanswered(
        unanswered
);

attempt.setTotalMarks(
        totalMarks
);

attempt.setObtainedMarks(
        obtainedMarks
);

attempt.setPercentage(
        percentage
);

attempt = quizAttemptRepository.save(
        attempt
);
/* ==========================================
   AWARD QUIZ XP
========================================== */

int quizXP = obtainedMarks;

levelService.addXP(

        student,

        quizXP

);
/* ==========================================
   UPDATE DAILY CHALLENGES
========================================== */

dailyChallengeService.updateProgressAfterQuiz(

        student,

        obtainedMarks,

        (int) percentage,

        totalQuestions,

        request.getTimeTaken()

);
 streakService.updateStreak(student);
/* ==========================================
   SAVE QUIZ ANSWERS
========================================== */

for (QuizAnswer answer : quizAnswers) {

    answer.setAttempt(attempt);

    quizAnswerRepository.save(answer);

}
/* ==========================================
   CREATE NOTIFICATION
========================================== */

notificationService.createNotification(

        student,

        "Quiz Completed",

        "You scored "

                + obtainedMarks

                + "/"

                + totalMarks

                + " ("

                + String.format("%.2f", percentage)

                + "%) in "

                + topic.getName()

                + ".",

        "QUIZ"

);

/* ==========================================
   BUILD RESPONSE
========================================== */

QuizResultResponse response =
        new QuizResultResponse();

response.setAttemptId(
        attempt.getId()
);

response.setTotalQuestions(
        totalQuestions
);

response.setCorrectAnswers(
        correctAnswers
);

response.setWrongAnswers(
        wrongAnswers
);

response.setUnanswered(
        unanswered
);

response.setTotalMarks(
        totalMarks
);

response.setObtainedMarks(
        obtainedMarks
);

response.setPercentage(
        percentage
);

response.setTimeTaken(
        request.getTimeTaken()
);

response.setPassed(
        percentage >= 50
);

response.setPassed(
        percentage >= 50
);

/* ==========================================
   BUILD ANSWER REVIEW
========================================== */

List<QuizResultResponse.QuestionResult> review =
        new ArrayList<>();

for (QuizAnswer answer : quizAnswers) {

    Question question = answer.getQuestion();

    QuizResultResponse.QuestionResult result =
            new QuizResultResponse.QuestionResult();

    result.setQuestionId(
            question.getId()
    );

    result.setQuestion(
            question.getQuestion()
    );

    result.setSelectedAnswer(
            answer.getSelectedAnswer()
    );

    result.setCorrectAnswer(
            answer.getCorrectAnswer()
    );

    result.setCorrect(
            Boolean.TRUE.equals(
                    answer.getIsCorrect()
            )
    );

    result.setExplanation(
            question.getExplanation()
    );

    result.setMarks(
            answer.getMarks()
    );

    review.add(result);

}

response.setAnswers(review);
/* ==========================================
   EVALUATE ACHIEVEMENTS
========================================== */

achievementService.evaluateAchievements(student);

/* ==========================================
   CREATE NOTIFICATION
========================================== */

notificationService.createNotification(

        student,

        "Quiz Completed",

        "You scored "

                + obtainedMarks

                + "/"

                + totalMarks

                + " ("

                + String.format("%.2f", percentage)

                + "%) in "

                + topic.getName()

                + ".",

        "QUIZ"

);

return response;
}
/* ==========================================
   ENTITY → DTO
========================================== */

private QuestionResponse convertToResponse(
        Question question
) {

    QuestionResponse response =
            new QuestionResponse();

    response.setId(
            question.getId()
    );

    response.setCategoryId(
            question.getCategory().getId()
    );

    response.setCategoryName(
            question.getCategory().getName()
    );

    response.setTopicId(
            question.getTopic().getId()
    );

    response.setTopicName(
            question.getTopic().getName()
    );

    response.setQuestion(
            question.getQuestion()
    );

    response.setOptionA(
            question.getOptionA()
    );

    response.setOptionB(
            question.getOptionB()
    );

    response.setOptionC(
            question.getOptionC()
    );

    response.setOptionD(
            question.getOptionD()
    );

    response.setDifficulty(
            question
                    .getDifficulty()
                    .name()
    );

    response.setMarks(
            question.getMarks()
    );

    return response;

}
/* ==========================================
   QUIZ HISTORY
========================================== */

public List<QuizHistoryResponse> getQuizHistory(
        String email
) {

    System.out.println("================================");
    System.out.println("JWT VALUE : " + email);
    System.out.println("================================");

    Student student =
            studentRepository.findByUser_Email(email)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Student not found."
                            )
                    );

    List<QuizAttempt> attempts =
            quizAttemptRepository
                    .findByStudentOrderByCompletedAtDesc(
                            student
                    );

    return attempts.stream()
            .map(attempt -> {

                QuizHistoryResponse response =
                        new QuizHistoryResponse();

                response.setAttemptId(
                        attempt.getId()
                );

                response.setCategory(
                        attempt.getCategory().getName()
                );

                response.setTopic(
                        attempt.getTopic().getName()
                );

                response.setDifficulty(
                        attempt.getDifficulty().name()
                );

                response.setScore(
                        attempt.getObtainedMarks()
                );

                response.setTotalMarks(
                        attempt.getTotalMarks()
                );

                response.setPercentage(
                        attempt.getPercentage()
                );

                response.setTimeTaken(
                        attempt.getTimeTaken()
                );

                response.setPassed(
                        attempt.getPercentage() >= 50
                );

                response.setCompletedAt(
                        attempt.getCompletedAt()
                );

                return response;

            })
            .collect(Collectors.toList());

}
/* ==========================================
   FILTER QUIZ HISTORY
========================================== */

public List<QuizHistoryResponse> filterQuizHistory(

        String email,

        String category,

        String topic,

        String difficulty,

        String fromDate,

        String toDate

) {

    Student student =
            studentRepository.findByUser_Email(email)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Student not found."
                            )
                    );

    List<QuizAttempt> attempts =
            quizAttemptRepository
                    .findByStudentOrderByCompletedAtDesc(student);

    return attempts.stream()

            /* ================= CATEGORY ================= */

            .filter(attempt ->

                    category == null ||

                    category.isBlank() ||

                    attempt.getCategory()
                            .getName()
                            .equalsIgnoreCase(category)

            )

            /* ================= TOPIC ================= */

            .filter(attempt ->

                    topic == null ||

                    topic.isBlank() ||

                    attempt.getTopic()
                            .getName()
                            .equalsIgnoreCase(topic)

            )

            /* ================= DIFFICULTY ================= */

            .filter(attempt ->

                    difficulty == null ||

                    difficulty.isBlank() ||

                    attempt.getDifficulty()
                            .name()
                            .equalsIgnoreCase(difficulty)

            )

            /* ================= FROM DATE ================= */

            .filter(attempt -> {

                if (fromDate == null || fromDate.isBlank()) {

                    return true;

                }

                LocalDateTime from =
                        LocalDateTime.parse(fromDate + "T00:00:00");

                return !attempt
                        .getCompletedAt()
                        .isBefore(from);

            })

            /* ================= TO DATE ================= */

            .filter(attempt -> {

                if (toDate == null || toDate.isBlank()) {

                    return true;

                }

                LocalDateTime to =
                        LocalDateTime.parse(toDate + "T23:59:59");

                return !attempt
                        .getCompletedAt()
                        .isAfter(to);

            })

            /* ================= DTO ================= */

            .map(attempt -> {

                QuizHistoryResponse response =
                        new QuizHistoryResponse();

                response.setAttemptId(
                        attempt.getId()
                );

                response.setCategory(
                        attempt.getCategory().getName()
                );

                response.setTopic(
                        attempt.getTopic().getName()
                );

                response.setDifficulty(
                        attempt.getDifficulty().name()
                );

                response.setScore(
                        attempt.getObtainedMarks()
                );

                response.setTotalMarks(
                        attempt.getTotalMarks()
                );

                response.setPercentage(
                        attempt.getPercentage()
                );

                response.setTimeTaken(
                        attempt.getTimeTaken()
                );

                response.setPassed(
                        attempt.getPercentage() >= 50
                );

                response.setCompletedAt(
                        attempt.getCompletedAt()
                );

                return response;

            })

            .collect(Collectors.toList());

}
public ReportResponse getReport(String email) {
        System.out.println("========== REPORT ==========");
    System.out.println("Email received = " + email);

    Student student = studentRepository
            .findByUser_Email(email)
            .orElseThrow(() ->
                    new RuntimeException("Student not found"));

    List<QuizAttempt> attempts =
            quizAttemptRepository
                    .findByStudentOrderByCompletedAtDesc(student);

    ReportResponse report = new ReportResponse();

    if (attempts.isEmpty()) {
        return report;
    }

    int totalTests = attempts.size();

    double highest = 0;
    double totalPercentage = 0;

    int totalCorrect = 0;
    int totalQuestions = 0;

    int passed = 0;
    int failed = 0;

    List<QuizHistoryResponse> history =
            new ArrayList<>();

    Map<String, List<Double>> topicMap =
            new HashMap<>();

    for (QuizAttempt attempt : attempts) {

        highest = Math.max(
                highest,
                attempt.getPercentage()
        );

        totalPercentage += attempt.getPercentage();

        totalCorrect += attempt.getObtainedMarks();

        totalQuestions += attempt.getTotalMarks();

        if (attempt.getPercentage() >= 50) {
    passed++;
} else {
    failed++;
}

        QuizHistoryResponse item =
                new QuizHistoryResponse();

        item.setAttemptId(attempt.getId());
        item.setCategory(attempt.getCategory().getName());
        item.setTopic(attempt.getTopic().getName());
        item.setDifficulty(
                attempt.getDifficulty().name()
        );
        item.setScore(attempt.getObtainedMarks());
        item.setTotalMarks(attempt.getTotalMarks());
        item.setPercentage(attempt.getPercentage());
        item.setTimeTaken(attempt.getTimeTaken());
        item.setPassed(
        attempt.getPercentage() >= 50
);
        item.setCompletedAt(attempt.getCompletedAt());

        history.add(item);

        String key =
                attempt.getCategory().getName()
                        + "|" +
                        attempt.getTopic().getName();

        topicMap
                .computeIfAbsent(
                        key,
                        k -> new ArrayList<>()
                )
                .add(attempt.getPercentage());

    }

    report.setTotalTests(totalTests);

    report.setHighestScore(highest);

    report.setAverageScore(
            totalPercentage / totalTests
    );

    report.setAccuracy(

            totalQuestions == 0

                    ? 0

                    : (double) totalCorrect * 100
                    / totalQuestions

    );

    report.setPassed(passed);

report.setFailed(failed);

    report.setHistory(history);

    List<TopicPerformance> strongTopics = new ArrayList<>();
List<TopicPerformance> weakTopics = new ArrayList<>();

for (String key : topicMap.keySet()) {

    List<Double> values = topicMap.get(key);

    double avg = values.stream()
            .mapToDouble(Double::doubleValue)
            .average()
            .orElse(0);

    String[] split = key.split("\\|");

    TopicPerformance tp = new TopicPerformance();

    tp.setCategory(split[0]);
    tp.setTopic(split[1]);
    tp.setAttempts(values.size());
    tp.setAverageScore(avg);
    tp.setPercentage(avg);

    if (avg >= 60) {
        strongTopics.add(tp);
    } else {
        weakTopics.add(tp);
    }
}

report.setStrongTopics(strongTopics);
report.setWeakTopics(weakTopics);

    return report;
}
/* ==========================================
   LEADERBOARD
========================================== */

public List<LeaderboardResponse> getLeaderboard() {

    List<QuizAttempt> attempts = quizAttemptRepository.findAll();

    Map<Long, LeaderboardResponse> leaderboardMap = new HashMap<>();

    for (QuizAttempt attempt : attempts) {

        Student student = attempt.getStudent();

        Long studentId = student.getId();

        LeaderboardResponse item = leaderboardMap.get(studentId);

        if (item == null) {

            item = new LeaderboardResponse();

            item.setStudentId(
                    student.getUser().getUserId()
            );

            item.setStudentName(
                    student.getUser().getFullName()
            );

            item.setProfileImage(
                    student.getProfileImage()
            );

            item.setTotalTests(0);

            item.setAverageScore(0);

            item.setAccuracy(0);

            leaderboardMap.put(studentId, item);
        }

        item.setTotalTests(
                item.getTotalTests() + 1
        );

        item.setAverageScore(
                item.getAverageScore()
                        + attempt.getPercentage()
        );

        item.setAccuracy(
                item.getAccuracy()
                        + (
                        (double) attempt.getObtainedMarks() * 100
                                / attempt.getTotalMarks()
                )
        );
    }

    List<LeaderboardResponse> leaderboard =
            new ArrayList<>(leaderboardMap.values());

    for (LeaderboardResponse item : leaderboard) {

        item.setAverageScore(
                item.getAverageScore()
                        / item.getTotalTests()
        );

        item.setAccuracy(
                item.getAccuracy()
                        / item.getTotalTests()
        );

        int xp =
                (int) Math.round(
                        item.getAverageScore() * 10
                );

        item.setXp(xp);

        if (xp >= 800) {

            item.setBadge("💎 Diamond");

        } else if (xp >= 500) {

            item.setBadge("🥇 Gold");

        } else if (xp >= 200) {

            item.setBadge("🥈 Silver");

        } else {

            item.setBadge("🥉 Bronze");

        }

    }

    leaderboard.sort(

            Comparator
                    .comparingDouble(
                            LeaderboardResponse::getAverageScore
                    )
                    .reversed()
                    .thenComparing(
                            Comparator.comparingDouble(
                                    LeaderboardResponse::getAccuracy
                            ).reversed()
                    )
                    .thenComparing(
                            Comparator.comparingInt(
                                    LeaderboardResponse::getTotalTests
                            ).reversed()
                    )

    );

    for (int i = 0; i < leaderboard.size(); i++) {

        leaderboard.get(i).setRank(i + 1);

    }

    return leaderboard;

}

}