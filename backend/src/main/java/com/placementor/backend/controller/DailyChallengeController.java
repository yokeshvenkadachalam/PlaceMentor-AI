package com.placementor.backend.controller;

import com.placementor.backend.dto.DailyChallengeResponse;
import com.placementor.backend.entity.User;
import com.placementor.backend.service.DailyChallengeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/daily-challenges")
@CrossOrigin(origins = "*")
public class DailyChallengeController {

    @Autowired
    private DailyChallengeService dailyChallengeService;

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
       GET TODAY'S CHALLENGES
    ========================================== */

    @GetMapping
    public ResponseEntity<List<DailyChallengeResponse>> getDailyChallenges() {

        return ResponseEntity.ok(

                dailyChallengeService.getDailyChallenges(

                        getEmail()

                )

        );

    }

}