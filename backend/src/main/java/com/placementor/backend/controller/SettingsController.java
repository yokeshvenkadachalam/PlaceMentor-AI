package com.placementor.backend.controller;

import com.placementor.backend.dto.SettingsRequest;
import com.placementor.backend.dto.SettingsResponse;
import com.placementor.backend.entity.User;
import com.placementor.backend.service.SettingsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    @Autowired
    private SettingsService settingsService;

    /* ==========================================
       GET SETTINGS
    ========================================== */

    @GetMapping
    public ResponseEntity<?> getSettings() {

        try {

            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();

            User user = (User) authentication.getPrincipal();

            SettingsResponse response =
                    settingsService.getSettings(
                            user.getEmail()
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

            return ResponseEntity
                    .badRequest()
                    .body(error);

        }

    }

    /* ==========================================
       UPDATE SETTINGS
    ========================================== */

    @PutMapping
    public ResponseEntity<?> updateSettings(

            @RequestBody SettingsRequest request

    ) {

        try {

            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();

            User user = (User) authentication.getPrincipal();

            SettingsResponse response =
                    settingsService.updateSettings(

                            user.getEmail(),

                            request

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

            return ResponseEntity
                    .badRequest()
                    .body(error);

        }

    }

    /* ==========================================
       DELETE ACCOUNT
    ========================================== */

    @DeleteMapping
    public ResponseEntity<?> deleteAccount() {

        try {

            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();

            User user = (User) authentication.getPrincipal();

            settingsService.deleteAccount(
                    user.getEmail()
            );

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Account deleted successfully."
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

            return ResponseEntity
                    .badRequest()
                    .body(error);

        }

    }

}