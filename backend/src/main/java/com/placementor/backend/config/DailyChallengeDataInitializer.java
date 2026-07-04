package com.placementor.backend.config;

import com.placementor.backend.entity.DailyChallenge;
import com.placementor.backend.repository.DailyChallengeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DailyChallengeDataInitializer
        implements CommandLineRunner {

    @Autowired
    private DailyChallengeRepository dailyChallengeRepository;

    @Override
    public void run(String... args) {

        if (dailyChallengeRepository.count() > 0) {
            return;
        }

        saveChallenge(
                "Complete 3 Quizzes",
                "Finish three quizzes today.",
                "QUIZZES",
                3,
                100
        );

        saveChallenge(
                "Score 80% or Higher",
                "Score at least 80% in a quiz.",
                "SCORE",
                80,
                150
        );

        saveChallenge(
                "Answer 20 Questions",
                "Answer twenty questions today.",
                "QUESTIONS",
                20,
                120
        );

        saveChallenge(
                "Practice 30 Minutes",
                "Spend at least 30 minutes practicing.",
                "TIME",
                30,
                100
        );

        System.out.println("--------------------------------");
        System.out.println("Daily Challenges Initialized");
        System.out.println("--------------------------------");

    }

    /* ==========================================
       SAVE CHALLENGE
    ========================================== */

    private void saveChallenge(

            String title,

            String description,

            String type,

            int target,

            int xpReward

    ) {

        DailyChallenge challenge =
                new DailyChallenge();

        challenge.setTitle(title);

        challenge.setDescription(description);

        challenge.setType(type);

        challenge.setTarget(target);

        challenge.setXpReward(xpReward);

        challenge.setActive(true);

        dailyChallengeRepository.save(challenge);

    }

}