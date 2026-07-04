package com.placementor.backend.service;

import com.placementor.backend.dto.UserAchievementResponse;
import com.placementor.backend.dto.AchievementCardResponse;
import com.placementor.backend.entity.Student;

import java.util.List;

public interface AchievementService {

    /* ==========================================
       GET STUDENT ACHIEVEMENTS
    ========================================== */

    List<UserAchievementResponse> getAchievements(
            String email
    );
    List<AchievementCardResponse> getAllAchievements(
        String email
    );

    /* ==========================================
       EVALUATE ACHIEVEMENTS
    ========================================== */

    void evaluateAchievements(
            Student student
    );

    /* ==========================================
       UNLOCK ACHIEVEMENT
    ========================================== */
    

    void unlockAchievement(

            Student student,

            String achievementName

    );
    

}