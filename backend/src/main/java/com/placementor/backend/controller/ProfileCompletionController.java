package com.placementor.backend.controller;

import com.placementor.backend.dto.ProfileCompletionResponse;
import com.placementor.backend.entity.User;
import com.placementor.backend.service.ProfileCompletionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileCompletionController {

    @Autowired
    private ProfileCompletionService profileCompletionService;

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
       PROFILE COMPLETION
    ========================================== */

    @GetMapping("/completion")
    public ResponseEntity<ProfileCompletionResponse> getProfileCompletion() {

        return ResponseEntity.ok(

                profileCompletionService.getProfileCompletion(

                        getEmail()

                )

        );

    }

}