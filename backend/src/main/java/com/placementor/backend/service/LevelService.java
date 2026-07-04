package com.placementor.backend.service;

import com.placementor.backend.dto.LevelResponse;
import com.placementor.backend.entity.Student;

public interface LevelService {

    /* ==========================================
       AWARD XP
    ========================================== */

    void addXP(
            Student student,
            int xp
    );

    /* ==========================================
       LEVEL DETAILS
    ========================================== */

    LevelResponse getLevel(
            String email
    );

}