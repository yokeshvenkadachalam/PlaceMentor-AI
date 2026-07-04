package com.placementor.backend.controller;

import com.placementor.backend.dto.StreakResponse;
import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.User;
import com.placementor.backend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/streak")
@CrossOrigin(origins = "*")
public class StreakController {

    @Autowired
    private StudentRepository studentRepository;

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
       GET STREAK
    ========================================== */

    @GetMapping
    public ResponseEntity<StreakResponse> getStreak() {

        Student student = studentRepository

                .findByUser_Email(getEmail())

                .orElseThrow(() ->
                        new RuntimeException("Student not found."));

        StreakResponse response =
                new StreakResponse();

        response.setCurrentStreak(
                student.getCurrentStreak()
        );

        response.setLongestStreak(
                student.getLongestStreak()
        );

        response.setLastPracticeDate(
                student.getLastPracticeDate()
        );

        return ResponseEntity.ok(response);

    }

}