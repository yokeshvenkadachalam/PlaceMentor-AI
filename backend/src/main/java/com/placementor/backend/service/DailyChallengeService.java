package com.placementor.backend.service;

import com.placementor.backend.dto.DailyChallengeResponse;
import com.placementor.backend.entity.Student;

import java.util.List;

public interface DailyChallengeService {

    /* ==========================================
       GET TODAY'S CHALLENGES
    ========================================== */

    List<DailyChallengeResponse> getDailyChallenges(
            String email
    );

    /* ==========================================
       INITIALIZE TODAY'S CHALLENGES
    ========================================== */

    void initializeDailyChallenges(
            Student student
    );

    /* ==========================================
       UPDATE PROGRESS AFTER QUIZ
    ========================================== */

    void updateProgressAfterQuiz(

            Student student,

            int score,

            int percentage,

            int totalQuestions,

            int timeTaken

    );

}