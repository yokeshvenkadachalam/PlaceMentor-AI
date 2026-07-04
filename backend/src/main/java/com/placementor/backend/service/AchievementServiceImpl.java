package com.placementor.backend.service;

import com.placementor.backend.dto.UserAchievementResponse;
import com.placementor.backend.entity.Achievement;
import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.UserAchievement;
import com.placementor.backend.repository.AchievementRepository;
import com.placementor.backend.repository.QuizAttemptRepository;
import com.placementor.backend.repository.StudentRepository;
import com.placementor.backend.repository.UserAchievementRepository;
import com.placementor.backend.dto.AchievementCardResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AchievementServiceImpl implements AchievementService {

    @Autowired
    private AchievementRepository achievementRepository;

    @Autowired
    private UserAchievementRepository userAchievementRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private NotificationService notificationService;
    @Autowired
    private LevelService levelService;

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
       GET ACHIEVEMENTS
    ========================================== */

    @Override
    public List<UserAchievementResponse> getAchievements(String email) {

        Student student = getStudent(email);

        List<UserAchievement> achievements =
                userAchievementRepository
                        .findByStudentOrderByUnlockedAtDesc(student);

        List<UserAchievementResponse> response =
                new ArrayList<>();

        for (UserAchievement ua : achievements) {

            UserAchievementResponse dto =
                    new UserAchievementResponse();

            dto.setId(
                    ua.getAchievement().getId()
            );

            dto.setName(
                    ua.getAchievement().getName()
            );

            dto.setDescription(
                    ua.getAchievement().getDescription()
            );

            dto.setIcon(
                    ua.getAchievement().getIcon()
            );

            dto.setXpReward(
                    ua.getAchievement().getXpReward()
            );

            dto.setUnlockedAt(
                    ua.getUnlockedAt()
            );

            response.add(dto);

        }

        return response;

    }
    /* ==========================================
   GET ALL ACHIEVEMENTS
========================================== */

@Override
public List<AchievementCardResponse> getAllAchievements(
        String email
) {

    Student student = getStudent(email);

    List<Achievement> achievements =
            achievementRepository.findAll();

    int totalAttempts =
            quizAttemptRepository
                    .findByStudentOrderByCompletedAtDesc(student)
                    .size();

    double bestScore =

            quizAttemptRepository

                    .findTopByStudentOrderByPercentageDesc(student)

                    .map(a -> a.getPercentage())

                    .orElse(0.0);

    List<AchievementCardResponse> response =
            new ArrayList<>();

    for (Achievement achievement : achievements) {

        AchievementCardResponse card =
                new AchievementCardResponse();

        card.setId(
                achievement.getId()
        );

        card.setName(
                achievement.getName()
        );

        card.setDescription(
                achievement.getDescription()
        );

        card.setIcon(
                achievement.getIcon()
        );

        card.setXpReward(
                achievement.getXpReward()
        );

        UserAchievement unlocked =

                userAchievementRepository

                        .findByStudentAndAchievement(

                                student,

                                achievement

                        )

                        .orElse(null);

        card.setUnlocked(
                unlocked != null
        );

        if (unlocked != null) {

            card.setUnlockedAt(
                    unlocked.getUnlockedAt()
            );

        }

        int progress = 0;
        int target = 1;

        switch (achievement.getName()) {

            case "First Quiz":

                target = 1;
                progress = Math.min(totalAttempts, target);
                break;

            case "Quiz Explorer":

                target = 5;
                progress = Math.min(totalAttempts, target);
                break;

            case "Quiz Master":

                target = 10;
                progress = Math.min(totalAttempts, target);
                break;

            case "Placement Ready":

                target = 100;
                progress = Math.min(totalAttempts, target);
                break;

            case "High Performer":

                target = 90;
                progress = (int) Math.min(bestScore, target);
                break;

            case "Perfect Score":

                target = 100;
                progress = (int) Math.min(bestScore, target);
                break;

            case "7 Day Streak":

                target = 7;
                progress = 0;
                break;

            default:

                target = 1;
                progress = 0;

        }

        card.setProgress(progress);

        card.setTarget(target);

        response.add(card);

    }

    return response;

    }

    /* ==========================================
       EVALUATE ACHIEVEMENTS
    ========================================== */

    @Override
    public void evaluateAchievements(Student student) {

        long totalAttempts =

                quizAttemptRepository

                        .findByStudentOrderByCompletedAtDesc(student)

                        .size();

        if (totalAttempts >= 1) {

            unlockAchievement(
                    student,
                    "First Quiz"
            );

        }

        if (totalAttempts >= 5) {

            unlockAchievement(
                    student,
                    "Quiz Explorer"
            );

        }

        if (totalAttempts >= 10) {

            unlockAchievement(
                    student,
                    "Quiz Master"
            );

        }

    }

    /* ==========================================
       UNLOCK ACHIEVEMENT
    ========================================== */

    @Override
    public void unlockAchievement(

            Student student,

            String achievementName

    ) {

        Achievement achievement =

                achievementRepository

                        .findByName(achievementName)

                        .orElse(null);

        if (achievement == null) {

            return;

        }

        boolean alreadyUnlocked =

                userAchievementRepository

                        .existsByStudentAndAchievement(

                                student,

                                achievement

                        );

        if (alreadyUnlocked) {

            return;

        }

        UserAchievement userAchievement =
                new UserAchievement();

        userAchievement.setStudent(student);

        userAchievement.setAchievement(achievement);

        userAchievementRepository.save(
                userAchievement
        );

        notificationService.createNotification(

                student,

                "🏆 Achievement Unlocked",

                achievement.getName(),

                "ACHIEVEMENT"

        );
        /* ==========================================
   ACHIEVEMENT XP
========================================== */

levelService.addXP(

        student,

        achievement.getXpReward()

);

    }

}