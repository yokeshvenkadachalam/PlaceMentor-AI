package com.placementor.backend.service;

import com.placementor.backend.dto.DailyChallengeResponse;
import com.placementor.backend.entity.DailyChallenge;
import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.StudentDailyChallenge;
import com.placementor.backend.repository.DailyChallengeRepository;
import com.placementor.backend.repository.StudentDailyChallengeRepository;
import com.placementor.backend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DailyChallengeServiceImpl
        implements DailyChallengeService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DailyChallengeRepository dailyChallengeRepository;

    @Autowired
    private StudentDailyChallengeRepository studentDailyChallengeRepository;

    @Autowired
    private LevelService levelService;

    @Autowired
    private NotificationService notificationService;

    /* ==========================================
       GET STUDENT
    ========================================== */

    private Student getStudent(String email) {

        return studentRepository

                .findByUser_Email(email)

                .orElseThrow(() ->
                        new RuntimeException("Student not found."));

    }

    /* ==========================================
       INITIALIZE DAILY CHALLENGES
    ========================================== */

    @Override
    public void initializeDailyChallenges(
            Student student
    ) {

        LocalDate today = LocalDate.now();

        if (!studentDailyChallengeRepository

                .findByStudentAndChallengeDate(student, today)

                .isEmpty()) {

            return;

        }

        List<DailyChallenge> challenges =
                dailyChallengeRepository.findByActiveTrue();

        for (DailyChallenge challenge : challenges) {

            StudentDailyChallenge progress =
                    new StudentDailyChallenge();

            progress.setStudent(student);

            progress.setChallenge(challenge);

            progress.setChallengeDate(today);

            progress.setProgress(0);

            progress.setCompleted(false);

            progress.setRewardClaimed(false);

            studentDailyChallengeRepository.save(progress);

        }

    }

    /* ==========================================
       GET DAILY CHALLENGES
    ========================================== */

    @Override
    public List<DailyChallengeResponse> getDailyChallenges(
            String email
    ) {

        Student student = getStudent(email);

        initializeDailyChallenges(student);

        List<StudentDailyChallenge> list =

                studentDailyChallengeRepository

                        .findByStudentAndChallengeDate(

                                student,

                                LocalDate.now()

                        );

        List<DailyChallengeResponse> response =
                new ArrayList<>();

        for (StudentDailyChallenge item : list) {

            DailyChallengeResponse dto =
                    new DailyChallengeResponse();

            dto.setId(
                    item.getChallenge().getId()
            );

            dto.setTitle(
                    item.getChallenge().getTitle()
            );

            dto.setDescription(
                    item.getChallenge().getDescription()
            );

            dto.setXpReward(
                    item.getChallenge().getXpReward()
            );

            dto.setProgress(
                    item.getProgress()
            );

            dto.setTarget(
                    item.getChallenge().getTarget()
            );

            dto.setCompleted(
                    item.isCompleted()
            );

            response.add(dto);

        }

        return response;

    }

    /* ==========================================
       UPDATE AFTER QUIZ
    ========================================== */

    @Override
public void updateProgressAfterQuiz(

        Student student,

        int score,

        int percentage,

        int totalQuestions,

        int timeTaken

) {

    initializeDailyChallenges(student);

    List<StudentDailyChallenge> challenges =

            studentDailyChallengeRepository

                    .findByStudentAndChallengeDate(

                            student,

                            LocalDate.now()

                    );

    for (StudentDailyChallenge item : challenges) {

        DailyChallenge challenge = item.getChallenge();

        if (item.isCompleted()) {

            continue;

        }

        switch (challenge.getType()) {

            case "QUIZZES":

                item.setProgress(

                        item.getProgress() + 1

                );

                break;

            case "QUESTIONS":

                item.setProgress(

                        item.getProgress()

                                + totalQuestions

                );

                break;

            case "TIME":

                item.setProgress(

                        item.getProgress()

                                + timeTaken

                );

                break;

            case "SCORE":

                item.setProgress(

                        Math.max(

                                item.getProgress(),

                                percentage

                        )

                );

                break;

        }

        if (item.getProgress() >= challenge.getTarget()) {

            item.setCompleted(true);

        }

        if (item.isCompleted() && !item.isRewardClaimed()) {

            item.setRewardClaimed(true);

            levelService.addXP(

                    student,

                    challenge.getXpReward()

            );

            notificationService.createNotification(

                    student,

                    "🎯 Daily Challenge Completed",

                    challenge.getTitle()

                            + " (+" + challenge.getXpReward() + " XP)",

                    "CHALLENGE"

            );

        }

        studentDailyChallengeRepository.save(item);

    }

}

}