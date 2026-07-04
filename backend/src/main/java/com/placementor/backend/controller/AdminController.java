package com.placementor.backend.controller;

import com.placementor.backend.dto.AdminDashboardResponse;
import com.placementor.backend.dto.StudentDetailsResponse;
import com.placementor.backend.entity.User;
import com.placementor.backend.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import com.placementor.backend.dto.UpdateStudentRequest;
import com.placementor.backend.dto.CreateQuestionRequest;
import com.placementor.backend.dto.CategoryManagementResponse;
import com.placementor.backend.dto.CategoryDetailsResponse;
import com.placementor.backend.dto.UpdateCategoryRequest;
import com.placementor.backend.dto.CreateCategoryRequest;
import com.placementor.backend.dto.TopicManagementResponse;
import com.placementor.backend.dto.TopicDetailsResponse;
import com.placementor.backend.dto.UpdateTopicRequest;
import com.placementor.backend.dto.CreateTopicRequest;
import jakarta.validation.Valid;
import com.placementor.backend.dto.UpdateQuestionRequest;
import org.springframework.web.bind.annotation.*;
import com.placementor.backend.dto.AdminReportResponse;
import com.placementor.backend.dto.StudentPerformanceSummaryResponse;
import java.time.LocalDate;

import java.util.List;
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    /* ==========================================
       ADMIN DASHBOARD
    ========================================== */

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(
            Authentication authentication
    ) {

        if (authentication == null ||
                !(authentication.getPrincipal() instanceof User)) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized");

        }

        User user = (User) authentication.getPrincipal();

        if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Access Denied");

        }

        AdminDashboardResponse response =
                adminService.getDashboard();

        return ResponseEntity.ok(response);

    }
    /* ==========================================
   STUDENT MANAGEMENT
========================================== */

@GetMapping("/students")
public ResponseEntity<?> getAllStudents(
        Authentication authentication
) {

    if (authentication == null ||
            !(authentication.getPrincipal() instanceof User)) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Unauthorized");

    }

    User user = (User) authentication.getPrincipal();

    if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Access Denied");

    }

    return ResponseEntity.ok(
            adminService.getAllStudents()
    );
    

}
/* ==========================================
   QUESTION MANAGEMENT
========================================== */

@GetMapping("/questions")
public ResponseEntity<?> getAllQuestions(
        Authentication authentication
) {

    if (authentication == null ||
            !(authentication.getPrincipal() instanceof User)) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Unauthorized");

    }

    User user = (User) authentication.getPrincipal();

    if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Access Denied");

    }

    return ResponseEntity.ok(
            adminService.getAllQuestions()
    );

}
/* ==========================================
   GET ALL CATEGORIES
========================================== */

@GetMapping("/categories")
public ResponseEntity<?> getAllCategories(
        Authentication authentication
) {

    if (authentication == null ||
            !(authentication.getPrincipal() instanceof User)) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Unauthorized");

    }

    User user = (User) authentication.getPrincipal();

    if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Access Denied");

    }

    CategoryManagementResponse response =
            adminService.getAllCategories();

    return ResponseEntity.ok(response);

}
/* ==========================================
   GET ALL TOPICS
========================================== */

@GetMapping("/topics")
public ResponseEntity<TopicManagementResponse> getAllTopics() {

    return ResponseEntity.ok(

            adminService.getAllTopics()

    );

}
/* ==========================================
   GET TOPIC DETAILS
========================================== */

@GetMapping("/topics/{topicId}")
public ResponseEntity<TopicDetailsResponse> getTopicDetails(

        @PathVariable Long topicId

) {

    return ResponseEntity.ok(

            adminService.getTopicDetails(topicId)

    );

}
/* ==========================================
   CREATE TOPIC
========================================== */

@PostMapping("/topics")
public ResponseEntity<String> createTopic(

        @RequestBody CreateTopicRequest request

) {

    return ResponseEntity.ok(

            adminService.createTopic(request)

    );

}
/* ==========================================
   UPDATE TOPIC
========================================== */

@PutMapping("/topics/{topicId}")
public ResponseEntity<String> updateTopic(

        @PathVariable Long topicId,

        @RequestBody UpdateTopicRequest request

) {

    return ResponseEntity.ok(

            adminService.updateTopic(

                    topicId,

                    request

            )

    );

}
/* ==========================================
   DELETE TOPIC
========================================== */

@DeleteMapping("/topics/{topicId}")
public ResponseEntity<String> deleteTopic(
        @PathVariable Long topicId
) {

    return ResponseEntity.ok(

            adminService.deleteTopic(topicId)

    );

}

/* ==========================================
   GET CATEGORY DETAILS
========================================== */

@GetMapping("/categories/{categoryId}")
public ResponseEntity<CategoryDetailsResponse> getCategoryDetails(

        @PathVariable Long categoryId

) {

    return ResponseEntity.ok(

            adminService.getCategoryDetails(categoryId)

    );

}
/* ==========================================
   UPDATE CATEGORY
========================================== */

@PutMapping("/categories/{categoryId}")
public ResponseEntity<String> updateCategory(

        @PathVariable Long categoryId,

        @RequestBody UpdateCategoryRequest request

) {

    return ResponseEntity.ok(

            adminService.updateCategory(

                    categoryId,

                    request

            )

    );

}
/* ==========================================
   DELETE CATEGORY
========================================== */

@DeleteMapping("/categories/{categoryId}")
public ResponseEntity<String> deleteCategory(

        @PathVariable Long categoryId

) {

    return ResponseEntity.ok(

            adminService.deleteCategory(categoryId)

    );

}
/* ==========================================
   CREATE CATEGORY
========================================== */

@PostMapping("/categories")
public ResponseEntity<String> createCategory(

        @RequestBody CreateCategoryRequest request

) {

    return ResponseEntity.ok(

            adminService.createCategory(request)

    );

}
/* ==========================================
   QUESTION DETAILS
========================================== */

@GetMapping("/questions/{questionId}")
public ResponseEntity<?> getQuestionDetails(

        @PathVariable Long questionId,

        Authentication authentication

) {

    if (authentication == null ||
            !(authentication.getPrincipal() instanceof User)) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Unauthorized");

    }

    User user = (User) authentication.getPrincipal();

    if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Access Denied");

    }

    return ResponseEntity.ok(

            adminService.getQuestionDetails(questionId)

    );

}
/* ==========================================
   UPDATE QUESTION
========================================== */

@PutMapping("/questions/{questionId}")
public ResponseEntity<?> updateQuestion(

        @PathVariable Long questionId,

        @Valid @RequestBody UpdateQuestionRequest request,

        Authentication authentication

) {

    if (authentication == null ||
            !(authentication.getPrincipal() instanceof User)) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Unauthorized");

    }

    User user = (User) authentication.getPrincipal();

    if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Access Denied");

    }

    adminService.updateQuestion(

            questionId,

            request

    );

    return ResponseEntity.ok(

            "Question Updated Successfully"

    );

}
/* ==========================================
   DELETE QUESTION
========================================== */

@DeleteMapping("/questions/{questionId}")
public ResponseEntity<?> deleteQuestion(

        @PathVariable Long questionId,

        Authentication authentication

) {

    if (authentication == null ||
            !(authentication.getPrincipal() instanceof User)) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Unauthorized");

    }

    User user = (User) authentication.getPrincipal();

    if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Access Denied");

    }

    adminService.deleteQuestion(questionId);

    return ResponseEntity.ok(
            "Question Deleted Successfully"
    );

}
/* ==========================================
   CREATE QUESTION
========================================== */

@PostMapping("/questions")
public ResponseEntity<?> createQuestion(

        @Valid @RequestBody CreateQuestionRequest request,

        Authentication authentication

) {

    if (authentication == null ||
            !(authentication.getPrincipal() instanceof User)) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Unauthorized");

    }

    User user = (User) authentication.getPrincipal();

    if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Access Denied");

    }

    adminService.createQuestion(request);

    return ResponseEntity.ok(
            "Question Created Successfully"
    );

}
/* ==========================================
   STUDENT DETAILS
========================================== */

@GetMapping("/students/{studentId}")
public ResponseEntity<?> getStudentDetails(

        @PathVariable String studentId,

        Authentication authentication

) {

    if (authentication == null ||
            !(authentication.getPrincipal() instanceof User)) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Unauthorized");

    }

    User user = (User) authentication.getPrincipal();

    if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Access Denied");

    }

    StudentDetailsResponse response =
            adminService.getStudentDetails(studentId);

    return ResponseEntity.ok(response);

}
/* ==========================================
   UPDATE STUDENT
========================================== */

@PutMapping("/students/{studentId}")
public ResponseEntity<?> updateStudent(

        @PathVariable String studentId,

        @Valid @RequestBody UpdateStudentRequest request,

        Authentication authentication

) {

    if (authentication == null ||
            !(authentication.getPrincipal() instanceof User)) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Unauthorized");

    }

    User user = (User) authentication.getPrincipal();

    if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Access Denied");

    }

    adminService.updateStudent(studentId, request);

    return ResponseEntity.ok("Student Updated Successfully");

}
/* ==========================================
   DELETE STUDENT
========================================== */

@DeleteMapping("/students/{studentId}")
public ResponseEntity<?> deleteStudent(

        @PathVariable String studentId,

        Authentication authentication

) {

    if (authentication == null ||
            !(authentication.getPrincipal() instanceof User)) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Unauthorized");

    }

    User user = (User) authentication.getPrincipal();

    if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Access Denied");

    }

    adminService.deleteStudent(studentId);

    return ResponseEntity.ok("Student Deleted Successfully");

}
/* ==========================================
   ADMIN REPORTS
========================================== */

@GetMapping("/reports")
public ResponseEntity<List<AdminReportResponse>> getReports(

        @RequestParam LocalDate fromDate,

        @RequestParam LocalDate toDate

) {

    return ResponseEntity.ok(

            adminService.getReport(
                    fromDate,
                    toDate
            )

    );

}
/* ==========================================
   STUDENT PERFORMANCE SUMMARY REPORT
========================================== */

@GetMapping("/reports/summary")
public ResponseEntity<List<StudentPerformanceSummaryResponse>>
getStudentPerformanceSummary(

        @RequestParam LocalDate fromDate,

        @RequestParam LocalDate toDate

) {

    return ResponseEntity.ok(

            adminService.getStudentPerformanceSummary(

                    fromDate,

                    toDate

            )

    );

}

}