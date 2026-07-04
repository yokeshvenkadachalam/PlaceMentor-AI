package com.placementor.backend.controller;

import com.placementor.backend.dto.ForgotPasswordRequest;
import com.placementor.backend.dto.ResetPasswordRequest;
import com.placementor.backend.dto.VerifyOtpRequest;
import com.placementor.backend.service.ForgotPasswordService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class ForgotPasswordController {

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    /* ==========================================
       SEND RESET OTP
    ========================================== */

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        try {

            forgotPasswordService.sendOtp(request);

            Map<String, String> response = new HashMap<>();

            response.put(
                    "message",
                    "OTP sent successfully to your email."
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            Map<String, String> error = new HashMap<>();

            error.put(
                    "message",
                    e.getMessage()
            );

            return ResponseEntity
                    .badRequest()
                    .body(error);
        }
    }

    /* ==========================================
       VERIFY RESET OTP
    ========================================== */

    @PostMapping("/verify-reset-otp")
    public ResponseEntity<?> verifyOtp(
            @Valid @RequestBody VerifyOtpRequest request) {

        try {

            forgotPasswordService.verifyOtp(request);

            Map<String, String> response = new HashMap<>();

            response.put(
                    "message",
                    "OTP verified successfully."
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            Map<String, String> error = new HashMap<>();

            error.put(
                    "message",
                    e.getMessage()
            );

            return ResponseEntity
                    .badRequest()
                    .body(error);
        }
    }

    /* ==========================================
       RESET PASSWORD
    ========================================== */

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        try {

            forgotPasswordService.resetPassword(request);

            Map<String, String> response = new HashMap<>();

            response.put(
                    "message",
                    "Password reset successfully."
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            Map<String, String> error = new HashMap<>();

            error.put(
                    "message",
                    e.getMessage()
            );

            return ResponseEntity
                    .badRequest()
                    .body(error);
        }
    }

}