package com.placementor.backend.controller;

import com.placementor.backend.dto.QuizResultResponse;
import com.placementor.backend.dto.QuizStartRequest;
import com.placementor.backend.dto.QuizStartResponse;
import com.placementor.backend.entity.Category;
import com.placementor.backend.entity.Topic;
import com.placementor.backend.entity.User;
import com.placementor.backend.service.QuizService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.placementor.backend.dto.QuizSubmitRequest;
import com.placementor.backend.dto.QuizHistoryResponse;
import com.placementor.backend.dto.ReportResponse;
import com.placementor.backend.dto.LeaderboardResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    /* ==========================================
       GET ALL CATEGORIES
    ========================================== */

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {

        return ResponseEntity.ok(
                quizService.getCategories()
        );

    }

    /* ==========================================
       GET TOPICS BY CATEGORY
    ========================================== */

    @GetMapping("/topics/{categoryId}")
    public ResponseEntity<List<Topic>> getTopics(
            @PathVariable Long categoryId
    ) {

        return ResponseEntity.ok(
                quizService.getTopics(categoryId)
        );

    }

    /* ==========================================
       START QUIZ
    ========================================== */

    @PostMapping("/start")
    public ResponseEntity<QuizStartResponse> startQuiz(
            @RequestBody QuizStartRequest request
    ) {

        return ResponseEntity.ok(
                quizService.startQuiz(request)
        );

    }

    /* ==========================================
       SUBMIT QUIZ
    ========================================== */

    @PostMapping("/submit")
    public ResponseEntity<QuizResultResponse> submitQuiz(
            @RequestBody QuizSubmitRequest request
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        User user =
                (User) authentication.getPrincipal();

        return ResponseEntity.ok(

                quizService.submitQuiz(

                        user.getEmail(),

                        request

                )

        );

    }
    /* ==========================================
   QUIZ HISTORY
========================================== */

@GetMapping("/history")
public ResponseEntity<List<QuizHistoryResponse>> getQuizHistory() {

    Authentication authentication =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication();

    User user =
            (User) authentication.getPrincipal();

    return ResponseEntity.ok(

            quizService.getQuizHistory(
                    user.getEmail()
            )

    );

}
/* ==========================================
   FILTER QUIZ HISTORY
========================================== */

@GetMapping("/history/filter")
public ResponseEntity<List<QuizHistoryResponse>> filterQuizHistory(

        @RequestParam(required = false) String category,

        @RequestParam(required = false) String topic,

        @RequestParam(required = false) String difficulty,

        @RequestParam(required = false) String fromDate,

        @RequestParam(required = false) String toDate

) {

    Authentication authentication =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication();

    User user =
            (User) authentication.getPrincipal();

    return ResponseEntity.ok(

            quizService.filterQuizHistory(

                    user.getEmail(),

                    category,

                    topic,

                    difficulty,

                    fromDate,

                    toDate

            )

    );

}
/* ==========================================
   REPORTS
========================================== */

@GetMapping("/reports")
public ResponseEntity<ReportResponse> getReport() {

    Authentication authentication =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication();

    User user =
            (User) authentication.getPrincipal();

    return ResponseEntity.ok(

            quizService.getReport(

                    user.getEmail()

            )

    );

}
/* ==========================================
   LEADERBOARD
========================================== */

@GetMapping("/leaderboard")
public ResponseEntity<List<LeaderboardResponse>> getLeaderboard() {

    return ResponseEntity.ok(

            quizService.getLeaderboard()

    );

}

}