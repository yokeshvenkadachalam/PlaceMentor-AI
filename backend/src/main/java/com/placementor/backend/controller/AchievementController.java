package com.placementor.backend.controller;

import com.placementor.backend.dto.UserAchievementResponse;
import com.placementor.backend.entity.User;
import com.placementor.backend.service.AchievementService;
import com.placementor.backend.dto.AchievementCardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "*")
public class AchievementController {

    @Autowired
    private AchievementService achievementService;

    /* ==========================================
       GET LOGGED-IN USER EMAIL
    ========================================== */

    private String getEmail() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        User user =
                (User) authentication.getPrincipal();

        return user.getEmail();

    }

    /* ==========================================
       GET ALL ACHIEVEMENTS
    ========================================== */

    @GetMapping
    public ResponseEntity<List<UserAchievementResponse>> getAchievements() {

        return ResponseEntity.ok(

                achievementService.getAchievements(

                        getEmail()

                )

        );

    }
    /* ==========================================
   GET ALL ACHIEVEMENTS
========================================== */

@GetMapping("/all")
public ResponseEntity<List<AchievementCardResponse>> getAllAchievements() {

    return ResponseEntity.ok(

            achievementService.getAllAchievements(

                    getEmail()

            )

    );

}

}