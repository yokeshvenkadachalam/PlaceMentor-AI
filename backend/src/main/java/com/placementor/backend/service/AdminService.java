package com.placementor.backend.service;

import com.placementor.backend.dto.AdminDashboardResponse;
import com.placementor.backend.dto.RecentActivityResponse;
import com.placementor.backend.dto.RecentStudentResponse;
import com.placementor.backend.dto.StudentGrowthResponse;
import com.placementor.backend.entity.Question;
import com.placementor.backend.entity.QuizAttempt;
import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.Difficulty;
import com.placementor.backend.repository.CategoryRepository;
import com.placementor.backend.repository.QuestionRepository;
import com.placementor.backend.repository.QuizAttemptRepository;
import com.placementor.backend.repository.StudentRepository;
import com.placementor.backend.repository.TopicRepository;
import com.placementor.backend.dto.StudentCardResponse;
import com.placementor.backend.dto.StudentManagementResponse;
import com.placementor.backend.dto.StudentDetailsResponse;
import com.placementor.backend.dto.RecentQuizResponse;
import com.placementor.backend.dto.UpdateStudentRequest;
import com.placementor.backend.entity.User;
import com.placementor.backend.repository.UserRepository;
import com.placementor.backend.dto.QuestionCardResponse;
import com.placementor.backend.dto.QuestionManagementResponse;
import com.placementor.backend.dto.QuestionDetailsResponse;
import com.placementor.backend.dto.UpdateQuestionRequest;
import com.placementor.backend.dto.CreateQuestionRequest;
import com.placementor.backend.entity.Category;
import com.placementor.backend.dto.TopicCardResponse;
import com.placementor.backend.dto.TopicManagementResponse;
import com.placementor.backend.dto.TopicDetailsResponse;
import com.placementor.backend.dto.UpdateTopicRequest;
import com.placementor.backend.dto.CreateTopicRequest;
import com.placementor.backend.entity.Topic;
import com.placementor.backend.dto.CategoryCardResponse;
import com.placementor.backend.dto.CategoryDetailsResponse;
import com.placementor.backend.dto.CategoryManagementResponse;
import com.placementor.backend.dto.UpdateCategoryRequest;
import com.placementor.backend.dto.CreateCategoryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.placementor.backend.repository.NotificationRepository;
import com.placementor.backend.repository.UserAchievementRepository;
import com.placementor.backend.repository.StudentDailyChallengeRepository;
import com.placementor.backend.repository.StudentSettingsRepository;
import org.springframework.transaction.annotation.Transactional;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import com.placementor.backend.dto.AdminReportResponse;
import com.placementor.backend.dto.StudentPerformanceSummaryResponse;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Service
public class AdminService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
private NotificationRepository notificationRepository;

@Autowired
private UserAchievementRepository userAchievementRepository;

@Autowired
private StudentDailyChallengeRepository studentDailyChallengeRepository;

@Autowired
private StudentSettingsRepository studentSettingsRepository;

    public AdminDashboardResponse getDashboard() {

        AdminDashboardResponse response =
                new AdminDashboardResponse();

        /* ==========================================
           SUMMARY
        ========================================== */

        response.setTotalStudents(
                studentRepository.count()
        );

        response.setTotalQuestions(
                questionRepository.count()
        );

        response.setTotalQuizAttempts(
                quizAttemptRepository.count()
        );

        List<QuizAttempt> attempts =
                quizAttemptRepository.findAll();

        double average = attempts.stream()
                .mapToDouble(QuizAttempt::getPercentage)
                .average()
                .orElse(0);

        response.setAverageScore(average);

        /* ==========================================
           PLACEHOLDERS
        ========================================== */

        response.setResumeCount(0);

        response.setNotificationCount(0);

        /* ==========================================
           RECENT STUDENTS
        ========================================== */

        List<Student> students =
                studentRepository.findAll();

        students.sort(
                Comparator.comparing(Student::getCreatedAt)
                        .reversed()
        );

        List<RecentStudentResponse> recentStudents =
                new ArrayList<>();

        students.stream()
                .limit(5)
                .forEach(student -> {

                    RecentStudentResponse item =
                            new RecentStudentResponse();

                    item.setStudentId(
                            student.getUser().getUserId()
                    );

                    item.setName(
                            student.getUser().getFullName()
                    );

                    item.setCollege(
                            student.getCollege()
                    );

                    item.setStatus("Active");

                    recentStudents.add(item);

                });

        response.setRecentStudents(recentStudents);

        /* ==========================================
           RECENT ACTIVITIES
        ========================================== */

        List<RecentActivityResponse> activities =
                new ArrayList<>();

        attempts.stream()
                .sorted(
                        Comparator.comparing(
                                QuizAttempt::getCompletedAt
                        ).reversed()
                )
                .limit(5)
                .forEach(attempt -> {

                    RecentActivityResponse activity =
                            new RecentActivityResponse();

                    activity.setTitle(
                            attempt.getStudent()
                                    .getUser()
                                    .getFullName()
                    );

                    activity.setDescription(
                            "Completed "
                                    + attempt.getTopic().getName()
                                    + " Quiz"
                    );

                    activity.setTime(
                            attempt.getCompletedAt().toString()
                    );

                    activities.add(activity);

                });

        response.setRecentActivities(
                activities
        );
        

        /* ==========================================
           STUDENT GROWTH
        ========================================== */

        List<StudentGrowthResponse> growth =
                new ArrayList<>();

        for (int month = 1; month <= 12; month++) {

            final int currentMonth = month;

            long count = students.stream()

                    .filter(student ->

                            student.getCreatedAt()
                                    .getMonthValue() == currentMonth

                    )

                    .count();

            StudentGrowthResponse item =
                    new StudentGrowthResponse();

            item.setMonth(

                    java.time.Month.of(month)

                            .getDisplayName(

                                    TextStyle.SHORT,

                                    Locale.ENGLISH

                            )

            );

            item.setStudents(count);

            growth.add(item);

        }

        response.setStudentGrowth(growth);

        return response;

    }
    /* ==========================================
   GET ALL STUDENTS
========================================== */

public StudentManagementResponse getAllStudents() {

    StudentManagementResponse response =
            new StudentManagementResponse();

    List<Student> students =
            studentRepository.findAll();

    response.setTotalStudents(students.size());

    int active = 0;
    int inactive = 0;

    List<StudentCardResponse> studentCards =
            new ArrayList<>();

    for (Student student : students) {
        if (!student.getUser().getRole().equalsIgnoreCase("STUDENT")) {
        continue;
    }

        StudentCardResponse card =
                new StudentCardResponse();

        /* ==========================
           BASIC DETAILS
        ========================== */

        card.setStudentId(
                student.getUser().getUserId()
        );

        card.setName(
                student.getUser().getFullName()
        );

        card.setEmail(
                student.getUser().getEmail()
        );

        card.setMobile(
                student.getMobile()
        );

        card.setCollege(
                student.getCollege()
        );

        card.setDepartment(
                student.getDepartment()
        );

        card.setYearOfStudy(
                student.getYearOfStudy()
        );

        card.setProfileImage(
                student.getProfileImage()
        );

        /* ==========================
           STATUS
        ========================== */

        card.setStatus("Active");

        active++;

        /* ==========================
           QUIZ STATISTICS
        ========================== */

        List<QuizAttempt> attempts =
                quizAttemptRepository
                        .findByStudentOrderByCompletedAtDesc(
                                student
                        );

        card.setTotalAttempts(
                attempts.size()
        );

        double average = 0;
        double highest = 0;

        if (!attempts.isEmpty()) {

            double total = 0;

            for (QuizAttempt quiz : attempts) {

                total += quiz.getPercentage();

                if (quiz.getPercentage() > highest) {

                    highest = quiz.getPercentage();

                }

            }

            average = total / attempts.size();

        }

        card.setAverageScore(average);

        card.setHighestScore(highest);

        studentCards.add(card);

    }

    response.setTotalStudents(studentCards.size());

    response.setActiveStudents(active);

   response.setInactiveStudents(inactive);

   response.setStudents(studentCards);

   return response;

}
/* ==========================================
   GET ALL QUESTIONS
========================================== */

public QuestionManagementResponse getAllQuestions() {

    QuestionManagementResponse response =
            new QuestionManagementResponse();

    List<Question> questions =
            questionRepository.findAll();

    response.setTotalQuestions(
            questions.size()
    );

    int easy = 0;
    int medium = 0;
    int hard = 0;

    List<QuestionCardResponse> questionCards =
            new ArrayList<>();

    for (Question question : questions) {

        QuestionCardResponse card =
                new QuestionCardResponse();

        /* ==========================
           BASIC DETAILS
        ========================== */

        card.setId(
                question.getId()
        );

        card.setCategory(
                question.getCategory().getName()
        );

        card.setTopic(
                question.getTopic().getName()
        );

        card.setDifficulty(
                question.getDifficulty().name()
        );

        card.setQuestion(
                question.getQuestion()
        );

        card.setOptionA(
                question.getOptionA()
        );

        card.setOptionB(
                question.getOptionB()
        );

        card.setOptionC(
                question.getOptionC()
        );

        card.setOptionD(
                question.getOptionD()
        );

        card.setCorrectAnswer(
                question.getCorrectAnswer()
        );

        /* ==========================
           DIFFICULTY COUNT
        ========================== */

        switch (question.getDifficulty()) {

            case EASY:
                easy++;
                break;

            case MEDIUM:
                medium++;
                break;

            case HARD:
                hard++;
                break;

        }

        questionCards.add(card);

    }

    response.setEasyQuestions(easy);

    response.setMediumQuestions(medium);

    response.setHardQuestions(hard);

    response.setQuestions(questionCards);

    return response;

}
/* ==========================================
   GET ALL CATEGORIES
========================================== */

public CategoryManagementResponse getAllCategories() {

    CategoryManagementResponse response =
            new CategoryManagementResponse();

    List<Category> categories =
            categoryRepository.findAllByOrderByNameAsc();

    response.setTotalCategories(categories.size());

    int active = 0;
    int inactive = 0;

    List<CategoryCardResponse> cards =
            new ArrayList<>();

    for (Category category : categories) {

        CategoryCardResponse card =
                new CategoryCardResponse();

        card.setId(category.getId());

        card.setName(category.getName());

        card.setDescription(category.getDescription());

        card.setActive(category.isActive());

        if (category.isActive()) {
            active++;
        } else {
            inactive++;
        }

        card.setTotalTopics(

                topicRepository
                        .findByCategory(category)
                        .size()

        );

        card.setTotalQuestions(

                questionRepository
                        .findByCategory(category)
                        .size()

        );

        cards.add(card);

    }

    response.setActiveCategories(active);

    response.setInactiveCategories(inactive);

    response.setCategories(cards);

    return response;

}
/* ==========================================
   GET ALL TOPICS
========================================== */

public TopicManagementResponse getAllTopics() {

    List<Topic> topicList = topicRepository.findAllByOrderByNameAsc();

    TopicManagementResponse response = new TopicManagementResponse();

    response.setTotalTopics(topicList.size());

    response.setActiveTopics(

            (int) topicList.stream()

                    .filter(Topic::isActive)

                    .count()

    );

    response.setInactiveTopics(

            response.getTotalTopics()

                    - response.getActiveTopics()

    );

    List<TopicCardResponse> cards = new ArrayList<>();

    for (Topic topic : topicList) {

        TopicCardResponse card = new TopicCardResponse();

        card.setId(topic.getId());

        card.setName(topic.getName());

        card.setCategory(

                topic.getCategory().getName()

        );

        card.setActive(topic.isActive());

        card.setTotalQuestions(

                (int) questionRepository.countByTopic(topic)

        );

        cards.add(card);

    }

    response.setTopics(cards);

    return response;

}
public TopicDetailsResponse getTopicDetails(Long topicId) {

    Topic topic = topicRepository

            .findById(topicId)

            .orElseThrow(() ->

                    new RuntimeException(
                            "Topic Not Found"
                    )

            );

    long totalQuestions = questionRepository.countByTopic(topic);

    return new TopicDetailsResponse(

            topic.getId(),

            topic.getName(),

            topic.getCategory().getName(),

            topic.isActive(),

            totalQuestions

    );

}
/* ==========================================
   UPDATE TOPIC
========================================== */

public String updateTopic(
        Long topicId,
        UpdateTopicRequest request
) {

    Topic topic = topicRepository

            .findById(topicId)

            .orElseThrow(() ->

                    new RuntimeException(
                            "Topic Not Found"
                    )

            );

    Category category = categoryRepository

            .findByName(request.getCategory())

            .orElseThrow(() ->

                    new RuntimeException(
                            "Category Not Found"
                    )

            );

    topic.setName(

            request.getName()

    );

    topic.setCategory(

            category

    );

    topic.setActive(

            request.isActive()

    );

    topicRepository.save(

            topic

    );

    return "Topic Updated Successfully";

}
/* ==========================================
   DELETE TOPIC
========================================== */

public String deleteTopic(Long topicId) {

    Topic topic = topicRepository
            .findById(topicId)
            .orElseThrow(() ->
                    new RuntimeException("Topic Not Found"));

    long totalQuestions =
            questionRepository.countByTopic(topic);

    if (totalQuestions > 0) {

        throw new RuntimeException(
                "Cannot delete topic. Questions exist."
        );

    }

    topicRepository.delete(topic);

    return "Topic Deleted Successfully";
}
/* ==========================================
   CREATE TOPIC
========================================== */

public String createTopic(
        CreateTopicRequest request
) {

    Category category = categoryRepository
            .findByName(request.getCategory())
            .orElseThrow(() ->
                    new RuntimeException("Category Not Found")
            );

    if (topicRepository.existsByCategoryAndName(
            category,
            request.getName()
    )) {

        throw new RuntimeException(
                "Topic already exists."
        );

    }

    Topic topic = new Topic();

    topic.setName(
            request.getName()
    );

    topic.setCategory(
            category
    );

    topic.setActive(
            request.getActive()
    );

    topicRepository.save(topic);

    return "Topic Created Successfully";

}
/* ==========================================
   GET CATEGORY DETAILS
========================================== */

public CategoryDetailsResponse getCategoryDetails(Long categoryId) {

    Category category = categoryRepository

            .findById(categoryId)

            .orElseThrow(() ->

                    new RuntimeException(

                            "Category Not Found"

                    )

            );

    CategoryDetailsResponse response =
            new CategoryDetailsResponse();

    response.setId(
            category.getId()
    );

    response.setName(
            category.getName()
    );

    response.setDescription(
            category.getDescription()
    );

    response.setActive(
            category.isActive()
    );

    response.setTotalTopics(

            topicRepository

                    .findByCategory(category)

                    .size()

    );

    response.setTotalQuestions(

            questionRepository

                    .findByCategory(category)

                    .size()

    );

    return response;

}
/* ==========================================
   UPDATE CATEGORY
========================================== */

public String updateCategory(

        Long categoryId,

        UpdateCategoryRequest request

) {

    Category category = categoryRepository

            .findById(categoryId)

            .orElseThrow(() ->

                    new RuntimeException(

                            "Category Not Found"

                    )

            );

    category.setName(

            request.getName()

    );

    category.setDescription(

            request.getDescription()

    );

    category.setActive(

            request.isActive()

    );

    categoryRepository.save(category);

    return "Category Updated Successfully";

}
/* ==========================================
   DELETE CATEGORY
========================================== */

public String deleteCategory(Long categoryId) {

    Category category = categoryRepository

            .findById(categoryId)

            .orElseThrow(() ->

                    new RuntimeException(

                            "Category Not Found"

                    )

            );

    /* ==========================
       CHECK QUESTIONS
    ========================== */

    if (!questionRepository

            .findByCategory(category)

            .isEmpty()) {

        throw new RuntimeException(

                "Cannot delete category. Questions exist."

        );

    }

    /* ==========================
       CHECK TOPICS
    ========================== */

    if (!topicRepository

            .findByCategory(category)

            .isEmpty()) {

        throw new RuntimeException(

                "Cannot delete category. Topics exist."

        );

    }

    categoryRepository.delete(category);

    return "Category Deleted Successfully";

}
/* ==========================================
   CREATE CATEGORY
========================================== */

public String createCategory(

        CreateCategoryRequest request

) {

    /* ==========================
       CHECK DUPLICATE
    ========================== */

    if (categoryRepository.existsByName(

            request.getName()

    )) {

        throw new RuntimeException(

                "Category already exists."

        );

    }

    /* ==========================
       CREATE CATEGORY
    ========================== */

    Category category = new Category();

    category.setName(

            request.getName()

    );

    category.setDescription(

            request.getDescription()

    );

    category.setActive(

            request.isActive()

    );

    categoryRepository.save(category);

    return "Category Created Successfully";

}
/* ==========================================
   GET QUESTION DETAILS
========================================== */

public QuestionDetailsResponse getQuestionDetails(Long questionId) {

    Question question = questionRepository

            .findById(questionId)

            .orElseThrow(() ->

                    new RuntimeException(

                            "Question Not Found"

                    )

            );

    QuestionDetailsResponse response =
            new QuestionDetailsResponse();

    response.setId(
            question.getId()
    );

    response.setCategory(
            question.getCategory().getName()
    );

    response.setTopic(
            question.getTopic().getName()
    );

    response.setDifficulty(
            question.getDifficulty().name()
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

    response.setCorrectAnswer(
            question.getCorrectAnswer()
    );

    response.setExplanation(
            question.getExplanation()
    );

    response.setMarks(
            question.getMarks()
    );

    response.setActive(
            question.isActive()
    );

    return response;

}
/* ==========================================
   UPDATE QUESTION
========================================== */

public void updateQuestion(

        Long questionId,

        UpdateQuestionRequest request

) {

    Question question = questionRepository

            .findById(questionId)

            .orElseThrow(() ->

                    new RuntimeException(

                            "Question Not Found"

                    )

            );

    /* ==========================================
       UPDATE QUESTION
    ========================================== */

    question.setQuestion(

            request.getQuestion()

    );

    question.setOptionA(

            request.getOptionA()

    );

    question.setOptionB(

            request.getOptionB()

    );

    question.setOptionC(

            request.getOptionC()

    );

    question.setOptionD(

            request.getOptionD()

    );

    question.setCorrectAnswer(

            request.getCorrectAnswer()

    );

    question.setExplanation(

            request.getExplanation()

    );

    question.setDifficulty(

            Difficulty.valueOf(

                    request.getDifficulty()

                            .toUpperCase()

            )

    );

    question.setMarks(

            request.getMarks()

    );

    question.setActive(

            request.getActive()

    );

    /* ==========================================
       SAVE
    ========================================== */

    questionRepository.save(question);

}
/* ==========================================
   DELETE QUESTION
========================================== */

public void deleteQuestion(Long questionId) {

    Question question = questionRepository

            .findById(questionId)

            .orElseThrow(() ->

                    new RuntimeException(

                            "Question Not Found"

                    )

            );

    questionRepository.delete(question);

}
/* ==========================================
   CREATE QUESTION
========================================== */

public void createQuestion(CreateQuestionRequest request) {

    Category category = categoryRepository

            .findByName(request.getCategory())

            .orElseThrow(() ->

                    new RuntimeException("Category Not Found")

            );

    Topic topic = topicRepository

        .findByCategoryAndName(

                category,

                request.getTopic()

        )

        .orElseThrow(() ->

                new RuntimeException("Topic Not Found")

        );

    Question question = new Question();

    question.setCategory(category);

    question.setTopic(topic);

    question.setQuestion(request.getQuestion());

    question.setOptionA(request.getOptionA());

    question.setOptionB(request.getOptionB());

    question.setOptionC(request.getOptionC());

    question.setOptionD(request.getOptionD());

    question.setCorrectAnswer(request.getCorrectAnswer());

    question.setExplanation(request.getExplanation());

    question.setDifficulty(

            Difficulty.valueOf(

                    request.getDifficulty().toUpperCase()

            )

    );

    question.setMarks(request.getMarks());

    question.setActive(request.getActive());

    questionRepository.save(question);

}
/* ==========================================
   GET STUDENT DETAILS
========================================== */

public StudentDetailsResponse getStudentDetails(String studentId) {

    Student student = studentRepository

            .findByUser_UserId(studentId)

            .orElseThrow(() ->

                    new RuntimeException("Student Not Found")

            );

    StudentDetailsResponse response =
            new StudentDetailsResponse();

    /* ==========================================
       BASIC DETAILS
    ========================================== */

    response.setStudentId(
            student.getUser().getUserId()
    );

    response.setName(
            student.getUser().getFullName()
    );

    response.setEmail(
            student.getUser().getEmail()
    );

    response.setMobile(
            student.getMobile()
    );

    response.setCollege(
            student.getCollege()
    );

    response.setDepartment(
            student.getDepartment()
    );

    response.setYearOfStudy(
            student.getYearOfStudy()
    );

    response.setProfileImage(
            student.getProfileImage()
    );

    response.setStatus("Active");

    /* ==========================================
       QUIZ STATISTICS
    ========================================== */

    List<QuizAttempt> attempts =
            quizAttemptRepository
                    .findByStudentOrderByCompletedAtDesc(student);

    response.setTotalAttempts(
            attempts.size()
    );

    double total = 0;
    double highest = 0;

    for (QuizAttempt attempt : attempts) {

        total += attempt.getPercentage();

        if (attempt.getPercentage() > highest) {

            highest = attempt.getPercentage();

        }

    }

    double average = 0;

    if (!attempts.isEmpty()) {

        average = total / attempts.size();

    }

    response.setAverageScore(average);

    response.setHighestScore(highest);

    response.setAccuracy(average);

    response.setXp((int) (average * 10));

    /* ==========================================
       BADGE
    ========================================== */

    if (average >= 90) {

        response.setBadge("🏆 Platinum");

    }

    else if (average >= 75) {

        response.setBadge("🥇 Gold");

    }

    else if (average >= 50) {

        response.setBadge("🥈 Silver");

    }

    else {

        response.setBadge("🥉 Bronze");

    }

    /* ==========================================
       RECENT QUIZZES
    ========================================== */

    List<RecentQuizResponse> recent =
            new ArrayList<>();

    attempts.stream()

            .limit(10)

            .forEach(attempt -> {

                RecentQuizResponse quiz =
                        new RecentQuizResponse();

                quiz.setTopic(
                        attempt.getTopic().getName()
                );

                quiz.setCategory(
                        attempt.getCategory().getName()
                );

                quiz.setDifficulty(
                        attempt.getDifficulty().name()
                );

                quiz.setScore(
                        attempt.getPercentage()
                );

                quiz.setCompletedAt(
                        attempt.getCompletedAt().toString()
                );

                recent.add(quiz);

            });

    response.setRecentQuizzes(recent);

    return response;

}
/* ==========================================
   UPDATE STUDENT
========================================== */

public void updateStudent(

        String studentId,

        UpdateStudentRequest request

) {

    Student student = studentRepository

            .findByUser_UserId(studentId)

            .orElseThrow(() ->

                    new RuntimeException("Student Not Found")

            );

    User user = student.getUser();

    /* ==========================================
       UPDATE USER
    ========================================== */

    user.setFullName(
            request.getName()
    );

    user.setEmail(
            request.getEmail()
    );

    /* ==========================================
       UPDATE STUDENT
    ========================================== */

    student.setMobile(
            request.getMobile()
    );

    student.setCollege(
            request.getCollege()
    );

    student.setDepartment(
            request.getDepartment()
    );

    student.setYearOfStudy(
            request.getYearOfStudy()
    );

    /* ==========================================
       SAVE BOTH TABLES
    ========================================== */

    userRepository.save(user);

    studentRepository.save(student);

}
/* ==========================================
   DELETE STUDENT
========================================== */

@Transactional
public void deleteStudent(String studentId) {

    Student student = studentRepository
            .findByUser_UserId(studentId)
            .orElseThrow(() ->
                    new RuntimeException("Student Not Found"));

    User user = student.getUser();

    notificationRepository.deleteByStudent(student);

    userAchievementRepository.deleteByStudent(student);

    studentDailyChallengeRepository.deleteByStudent(student);

    studentSettingsRepository.deleteByStudent(student);

    quizAttemptRepository.deleteByStudent(student);

    studentRepository.delete(student);

    userRepository.delete(user);
}
/* ==========================================
   ADMIN REPORTS
========================================== */

public List<AdminReportResponse> getReport(
        LocalDate fromDate,
        LocalDate toDate
) {

    LocalDateTime from =
            fromDate.atStartOfDay();

    LocalDateTime to =
            toDate.atTime(23, 59, 59);

    List<QuizAttempt> attempts =
            quizAttemptRepository
                    .findByCompletedAtBetweenOrderByCompletedAtDesc(
                            from,
                            to
                    );

    List<AdminReportResponse> reports =
            new ArrayList<>();

    for (QuizAttempt quiz : attempts) {

        AdminReportResponse report =
                new AdminReportResponse();

        report.setStudentId(
                quiz.getStudent()
                        .getUser()
                        .getUserId()
        );

        report.setStudentName(
                quiz.getStudent()
                        .getUser()
                        .getFullName()
        );

        report.setEmail(
                quiz.getStudent()
                        .getUser()
                        .getEmail()
        );

        report.setCategory(
                quiz.getCategory()
                        .getName()
        );

        report.setTopic(
                quiz.getTopic()
                        .getName()
        );

        report.setScore(
        quiz.getCorrectAnswers()
);

        report.setTotalQuestions(
                quiz.getTotalQuestions()
        );

        report.setPercentage(
                quiz.getPercentage()
        );

        report.setCompletedAt(
                quiz.getCompletedAt()
        );

        if (quiz.getPercentage() >= 40) {

            report.setStatus("Passed");

        } else {

            report.setStatus("Failed");

        }

        reports.add(report);

    }

    return reports;

}
/* ==========================================
   STUDENT PERFORMANCE SUMMARY
========================================== */

public List<StudentPerformanceSummaryResponse> getStudentPerformanceSummary(
        LocalDate fromDate,
        LocalDate toDate
) {

    LocalDateTime from = fromDate.atStartOfDay();

    LocalDateTime to = toDate.atTime(23, 59, 59);

    List<QuizAttempt> attempts =
            quizAttemptRepository
                    .findByCompletedAtBetweenOrderByCompletedAtDesc(
                            from,
                            to
                    );

    List<StudentPerformanceSummaryResponse> summary =
            new ArrayList<>();

    List<Student> students = studentRepository.findAll();

    for (Student student : students) {

        List<QuizAttempt> studentAttempts =
                attempts.stream()

                        .filter(a ->

                                a.getStudent()
                                 .getId()
                                 .equals(student.getId())

                        )

                        .toList();

        if (studentAttempts.isEmpty()) {

            continue;

        }

        StudentPerformanceSummaryResponse item =
                new StudentPerformanceSummaryResponse();

        item.setStudentId(

                student.getUser().getUserId()

        );

        item.setStudentName(

                student.getUser().getFullName()

        );

        item.setEmail(

                student.getUser().getEmail()

        );

        item.setTotalAttempts(

                studentAttempts.size()

        );

        double average =

                studentAttempts.stream()

                        .mapToDouble(

                                QuizAttempt::getPercentage

                        )

                        .average()

                        .orElse(0);

        item.setAveragePercentage(average);

        double best =

                studentAttempts.stream()

                        .mapToDouble(

                                QuizAttempt::getPercentage

                        )

                        .max()

                        .orElse(0);

        item.setBestPercentage(best);

        double worst =

                studentAttempts.stream()

                        .mapToDouble(

                                QuizAttempt::getPercentage

                        )

                        .min()

                        .orElse(0);

        item.setWorstPercentage(worst);

        long pass =

                studentAttempts.stream()

                        .filter(

                                a -> a.getPercentage() >= 40

                        )

                        .count();

        item.setPassCount(pass);

        item.setFailCount(

                studentAttempts.size() - pass

        );

        item.setLastAttempt(

                studentAttempts.get(0)

                        .getCompletedAt()

        );

        summary.add(item);

    }

    return summary;

}
}