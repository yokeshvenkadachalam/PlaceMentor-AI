package com.placementor.backend.controller;

import com.placementor.backend.dto.AdminResponse;
import com.placementor.backend.dto.CreateAdminRequest;
import com.placementor.backend.dto.UpdateAdminRequest;
import com.placementor.backend.entity.User;
import com.placementor.backend.service.AdminManagementService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "*")
public class AdminManagementController {

    @Autowired
    private AdminManagementService adminManagementService;

    /* ==========================================
       GET CURRENT ADMIN
    ========================================== */

    private User getCurrentAdmin(Authentication authentication) {

        if (authentication == null ||
                !(authentication.getPrincipal() instanceof User)) {

            throw new RuntimeException("Unauthorized");

        }

        return (User) authentication.getPrincipal();

    }
        /* ==========================================
       GET ALL ADMINS
    ========================================== */

    @GetMapping
    public ResponseEntity<?> getAllAdmins(

            Authentication authentication

    ) {

        try {

            User currentAdmin =

                    getCurrentAdmin(authentication);

            List<AdminResponse> admins =

                    adminManagementService.getAllAdmins(currentAdmin);

            return ResponseEntity.ok(admins);

        }

        catch (RuntimeException e) {

            return ResponseEntity

                    .status(HttpStatus.FORBIDDEN)

                    .body(e.getMessage());

        }

    }

    /* ==========================================
       GET ADMIN BY ID
    ========================================== */

    @GetMapping("/{id}")
    public ResponseEntity<?> getAdminById(

            @PathVariable Long id,

            Authentication authentication

    ) {

        try {

            User currentAdmin =

                    getCurrentAdmin(authentication);

            AdminResponse response =

                    adminManagementService.getAdminById(

                            id,

                            currentAdmin

                    );

            return ResponseEntity.ok(response);

        }

        catch (RuntimeException e) {

            return ResponseEntity

                    .status(HttpStatus.BAD_REQUEST)

                    .body(e.getMessage());

        }

    }
        /* ==========================================
       CREATE ADMIN
    ========================================== */

    @PostMapping
    public ResponseEntity<?> createAdmin(

            @Valid @RequestBody CreateAdminRequest request,

            Authentication authentication

    ) {

        try {

            User currentAdmin =
                    getCurrentAdmin(authentication);

            AdminResponse response =
                    adminManagementService.createAdmin(

                            request,

                            currentAdmin

                    );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);

        }

        catch (RuntimeException e) {

            return ResponseEntity

                    .status(HttpStatus.BAD_REQUEST)

                    .body(e.getMessage());

        }

    }

    /* ==========================================
       UPDATE ADMIN
    ========================================== */

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAdmin(

            @PathVariable Long id,

            @Valid @RequestBody UpdateAdminRequest request,

            Authentication authentication

    ) {

        try {

            User currentAdmin =
                    getCurrentAdmin(authentication);

            AdminResponse response =
                    adminManagementService.updateAdmin(

                            id,

                            request,

                            currentAdmin

                    );

            return ResponseEntity.ok(response);

        }

        catch (RuntimeException e) {

            return ResponseEntity

                    .status(HttpStatus.BAD_REQUEST)

                    .body(e.getMessage());

        }

    }
        /* ==========================================
       DELETE ADMIN
    ========================================== */

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdmin(

            @PathVariable Long id,

            Authentication authentication

    ) {

        try {

            User currentAdmin =
                    getCurrentAdmin(authentication);

            adminManagementService.deleteAdmin(

                    id,

                    currentAdmin

            );

            return ResponseEntity.ok(

                    "Admin deleted successfully."

            );

        }

        catch (RuntimeException e) {

            return ResponseEntity

                    .status(HttpStatus.BAD_REQUEST)

                    .body(e.getMessage());

        }

    }

    /* ==========================================
       ACTIVATE ADMIN
    ========================================== */

    @PutMapping("/{id}/activate")
    public ResponseEntity<?> activateAdmin(

            @PathVariable Long id,

            Authentication authentication

    ) {

        try {

            User currentAdmin =
                    getCurrentAdmin(authentication);

            AdminResponse response =
                    adminManagementService.activateAdmin(

                            id,

                            currentAdmin

                    );

            return ResponseEntity.ok(response);

        }

        catch (RuntimeException e) {

            return ResponseEntity

                    .status(HttpStatus.BAD_REQUEST)

                    .body(e.getMessage());

        }

    }

    /* ==========================================
       DEACTIVATE ADMIN
    ========================================== */

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateAdmin(

            @PathVariable Long id,

            Authentication authentication

    ) {

        try {

            User currentAdmin =
                    getCurrentAdmin(authentication);

            AdminResponse response =
                    adminManagementService.deactivateAdmin(

                            id,

                            currentAdmin

                    );

            return ResponseEntity.ok(response);

        }

        catch (RuntimeException e) {

            return ResponseEntity

                    .status(HttpStatus.BAD_REQUEST)

                    .body(e.getMessage());

        }

    }

    /* ==========================================
       CHANGE PASSWORD
    ========================================== */

    @PutMapping("/{id}/change-password")
    public ResponseEntity<?> changePassword(

            @PathVariable Long id,

            @RequestParam String password,

            Authentication authentication

    ) {

        try {

            User currentAdmin =
                    getCurrentAdmin(authentication);

            adminManagementService.changePassword(

                    id,

                    password,

                    currentAdmin

            );

            return ResponseEntity.ok(

                    "Password changed successfully."

            );

        }

        catch (RuntimeException e) {

            return ResponseEntity

                    .status(HttpStatus.BAD_REQUEST)

                    .body(e.getMessage());

        }

    }

    /* ==========================================
       RESET PASSWORD
    ========================================== */

    @PutMapping("/{id}/reset-password")
    public ResponseEntity<?> resetPassword(

            @PathVariable Long id,

            Authentication authentication

    ) {

        try {

            User currentAdmin =
                    getCurrentAdmin(authentication);

            String newPassword =
                    adminManagementService.resetPassword(

                            id,

                            currentAdmin

                    );

            return ResponseEntity.ok(

                    "Temporary Password : " + newPassword

            );

        }

        catch (RuntimeException e) {

            return ResponseEntity

                    .status(HttpStatus.BAD_REQUEST)

                    .body(e.getMessage());

        }

    }
    

}