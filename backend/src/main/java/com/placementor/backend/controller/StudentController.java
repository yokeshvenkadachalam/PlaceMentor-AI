package com.placementor.backend.controller;

import com.placementor.backend.dto.StudentProfileResponse;
import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.User;
import com.placementor.backend.service.StudentService;
import org.springframework.web.multipart.MultipartFile;
import com.placementor.backend.service.UploadService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService studentService;
    @Autowired
    private UploadService uploadService;

    /* ==========================================
       GET LOGGED-IN PROFILE
    ========================================== */

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {

        try {

            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();

            User user = (User) authentication.getPrincipal();

            StudentProfileResponse response =
                    studentService.getProfileResponseByEmail(
                            user.getEmail()
                    );

            return ResponseEntity.ok(response);

        }

        catch (Exception e) {

            Map<String, String> error = new HashMap<>();

            error.put("message", e.getMessage());

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error);

        }

    }

    /* ==========================================
       UPDATE LOGGED-IN PROFILE
    ========================================== */

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(

            @RequestBody Student updatedStudent

    ) {

        try {

            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();

            User user = (User) authentication.getPrincipal();

            Student student =
                    studentService.updateProfileByEmail(

                            user.getEmail(),

                            updatedStudent

                    );

            return ResponseEntity.ok(student);

        }

        catch (Exception e) {

            Map<String, String> error = new HashMap<>();

            error.put("message", e.getMessage());

            return ResponseEntity
                    .badRequest()
                    .body(error);

        }

    }

    /* ==========================================
       GET ALL STUDENTS
    ========================================== */

    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAllStudents() {

        return ResponseEntity.ok(

                studentService.getAllStudents()

        );

    }

    /* ==========================================
       DELETE PROFILE
    ========================================== */

    @DeleteMapping("/profile/{userId}")
    public ResponseEntity<?> deleteProfile(

            @PathVariable String userId

    ) {

        try {

            studentService.deleteProfile(userId);

            Map<String, String> response = new HashMap<>();

            response.put(

                    "message",

                    "Student Profile Deleted Successfully"

            );

            return ResponseEntity.ok(response);

        }

        catch (Exception e) {

            Map<String, String> error = new HashMap<>();

            error.put("message", e.getMessage());

            return ResponseEntity
                    .badRequest()
                    .body(error);

        }

    }
    @PostMapping("/profile-image")
public ResponseEntity<?> uploadProfileImage(
        @RequestParam("file") MultipartFile file) {

    try {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();

        String filename = uploadService.uploadProfileImage(file);

        studentService.updateProfileImage(
                user.getEmail(),
                filename
        );

        Map<String, String> response = new HashMap<>();

        response.put("message", "Profile image uploaded successfully");
        response.put("filename", filename);
        response.put(
                "url",
                "https://placementor-backend-5lv4.onrender.com/uploads/profiles/" + filename
        );

        return ResponseEntity.ok(response);

    } catch (Exception e) {

        Map<String, String> error = new HashMap<>();
        error.put("message", e.getMessage());

        return ResponseEntity.badRequest().body(error);

    }
}
@PostMapping("/resume")
public ResponseEntity<?> uploadResume(
        @RequestParam("file") MultipartFile file) {

    try {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();

        String filename = uploadService.uploadResume(file);

        studentService.updateResume(
                user.getEmail(),
                filename
        );

        Map<String, String> response = new HashMap<>();

        response.put("message", "Resume uploaded successfully");
        response.put("filename", filename);
        response.put(
                "url",
                "https://placementor-backend-5lv4.onrender.com/uploads/resumes/" + filename
        );

        return ResponseEntity.ok(response);

    } catch (Exception e) {

        Map<String, String> error = new HashMap<>();
        error.put("message", e.getMessage());

        return ResponseEntity.badRequest().body(error);

    }
}

}