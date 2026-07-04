package com.placementor.backend.config;

import com.placementor.backend.entity.Achievement;
import com.placementor.backend.repository.AchievementRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AchievementDataInitializer implements CommandLineRunner {

    private final AchievementRepository achievementRepository;

    public AchievementDataInitializer(
            AchievementRepository achievementRepository
    ) {
        this.achievementRepository = achievementRepository;
    }

    @Override
    public void run(String... args) {

        createAchievement(
                "First Quiz",
                "Complete your first quiz.",
                "🥇",
                100
        );

        createAchievement(
                "Quiz Explorer",
                "Complete 5 quizzes.",
                "📚",
                250
        );

        createAchievement(
                "Quiz Master",
                "Complete 10 quizzes.",
                "🏆",
                500
        );

        createAchievement(
                "High Performer",
                "Score 90% or above in a quiz.",
                "🔥",
                200
        );

        createAchievement(
                "Perfect Score",
                "Score 100% in a quiz.",
                "💯",
                300
        );

        createAchievement(
                "7 Day Streak",
                "Practice for seven consecutive days.",
                "⚡",
                400
        );

        createAchievement(
                "Placement Ready",
                "Complete 100 quizzes.",
                "🚀",
                1000
        );

        System.out.println("--------------------------------");
        System.out.println("Achievements Initialized");
        System.out.println("--------------------------------");

    }

    /* ==========================================
       CREATE IF NOT EXISTS
    ========================================== */

    private void createAchievement(

            String name,

            String description,

            String icon,

            int xpReward

    ) {

        if (achievementRepository.findByName(name).isPresent()) {
            return;
        }

        Achievement achievement =
                new Achievement();

        achievement.setName(name);

        achievement.setDescription(description);

        achievement.setIcon(icon);

        achievement.setXpReward(xpReward);

        achievement.setActive(true);

        achievementRepository.save(achievement);

    }

}