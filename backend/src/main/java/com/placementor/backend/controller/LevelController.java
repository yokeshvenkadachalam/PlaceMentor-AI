package com.placementor.backend.controller;

import com.placementor.backend.dto.LevelResponse;
import com.placementor.backend.entity.User;
import com.placementor.backend.service.LevelService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/level")
@CrossOrigin(origins = "*")
public class LevelController {

    @Autowired
    private LevelService levelService;

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
       GET LEVEL DATA
    ========================================== */

    @GetMapping
    public ResponseEntity<LevelResponse> getLevel() {

        return ResponseEntity.ok(

                levelService.getLevel(

                        getEmail()

                )

        );

    }

}