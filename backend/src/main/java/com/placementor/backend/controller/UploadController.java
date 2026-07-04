package com.placementor.backend.controller;

import com.placementor.backend.entity.User;
import com.placementor.backend.service.StudentService;
import com.placementor.backend.service.UploadService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class UploadController {

    @Autowired
    private UploadService uploadService;

    @Autowired
    private StudentService studentService;

    /* ==========================================
       UPLOAD PROFILE IMAGE
    ========================================== */

    @PostMapping("/profile-image")
    public ResponseEntity<?> uploadProfileImage(

            @RequestParam("file") MultipartFile file

    ) {

        try {

            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();

            User user = (User) authentication.getPrincipal();

            String filename =
                    uploadService.uploadProfileImage(file);

            studentService.updateProfileImage(

                    user.getEmail(),

                    filename

            );

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Profile image uploaded successfully"
            );

            response.put(
                    "filename",
                    filename
            );

            response.put(
                    "url",
                    "/uploads/profiles/" + filename
            );

            return ResponseEntity.ok(response);

        }

        catch (Exception e) {

            Map<String, String> error =
                    new HashMap<>();

            error.put(
                    "message",
                    e.getMessage()
            );

            return ResponseEntity.badRequest().body(error);

        }

    }

    /* ==========================================
       UPLOAD RESUME
    ========================================== */

    @PostMapping("/resume")
    public ResponseEntity<?> uploadResume(

            @RequestParam("file") MultipartFile file

    ) {

        try {

            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();

            User user = (User) authentication.getPrincipal();

            String filename =
                    uploadService.uploadResume(file);

            studentService.updateResume(

                    user.getEmail(),

                    filename

            );

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Resume uploaded successfully"
            );

            response.put(
                    "filename",
                    filename
            );

            response.put(
                    "url",
                    "/uploads/resumes/" + filename
            );

            return ResponseEntity.ok(response);

        }

        catch (Exception e) {

            Map<String, String> error =
                    new HashMap<>();

            error.put(
                    "message",
                    e.getMessage()
            );

            return ResponseEntity.badRequest().body(error);

        }

    }

}