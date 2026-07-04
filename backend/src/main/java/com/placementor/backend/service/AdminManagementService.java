package com.placementor.backend.service;

import com.placementor.backend.dto.AdminResponse;
import com.placementor.backend.dto.CreateAdminRequest;
import com.placementor.backend.dto.UpdateAdminRequest;
import com.placementor.backend.entity.User;
import com.placementor.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminManagementService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /* ==========================================
       CHECK MASTER ADMIN
    ========================================== */

    private void validateMasterAdmin(User currentAdmin) {

        if (currentAdmin == null) {

            throw new RuntimeException(
                    "Unauthorized access."
            );

        }

        if (!currentAdmin.isMasterAdmin()) {

            throw new RuntimeException(
                    "Only Master Admin can perform this action."
            );

        }

    }

    /* ==========================================
       USER → ADMIN RESPONSE
    ========================================== */

    private AdminResponse toResponse(User user) {

        AdminResponse response =
                new AdminResponse();

        response.setId(
                user.getId()
        );

        response.setUserId(
                user.getUserId()
        );

        response.setFullName(
                user.getFullName()
        );

        response.setEmail(
                user.getEmail()
        );

        response.setActive(
                user.isActive()
        );

        response.setMasterAdmin(
                user.isMasterAdmin()
        );

        return response;

    }
        /* ==========================================
       GET ALL ADMINS
    ========================================== */

    public List<AdminResponse> getAllAdmins(User currentAdmin) {

        validateMasterAdmin(currentAdmin);

        List<User> admins =
                userRepository.findByRole("ADMIN");

        return admins.stream()

                .map(this::toResponse)

                .collect(Collectors.toList());

    }

    /* ==========================================
       GET ADMIN BY ID
    ========================================== */

    public AdminResponse getAdminById(

            Long id,

            User currentAdmin

    ) {

        validateMasterAdmin(currentAdmin);

        User admin = userRepository

                .findById(id)

                .orElseThrow(() ->

                        new RuntimeException(

                                "Admin not found."

                        )

                );

        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {

            throw new RuntimeException(

                    "User is not an Admin."

            );

        }

        return toResponse(admin);

    }
        /* ==========================================
       CREATE ADMIN
    ========================================== */

    public AdminResponse createAdmin(

            CreateAdminRequest request,

            User currentAdmin

    ) {

        // Only Master Admin can create admins
        validateMasterAdmin(currentAdmin);

        // Check duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException(
                    "Email already exists."
            );

        }

        // Create new admin
        User admin = new User();

        admin.setFullName(
                request.getFullName()
        );

        admin.setEmail(
                request.getEmail()
        );

        // Encrypt Password
        admin.setPassword(

                passwordEncoder.encode(

                        request.getPassword()

                )

        );

        // Admin Role
        admin.setRole("ADMIN");

        // Generate Admin ID
        admin.setUserId(

                userService.generateUserId("ADMIN")

        );

        // Default Values
        admin.setVerified(true);

        admin.setActive(true);

        // Every newly created admin is NORMAL admin
        admin.setMasterAdmin(false);

        // Save
        User savedAdmin =

                userRepository.save(admin);

        return toResponse(savedAdmin);

    }
    /* ==========================================
   PROTECT MASTER ADMIN
========================================== */

private void validateTargetAdmin(User admin) {

    if (admin.isMasterAdmin()) {

        throw new RuntimeException(

                "Operation is not allowed on Master Admin."

        );

    }

}
        /* ==========================================
       UPDATE ADMIN
    ========================================== */

    public AdminResponse updateAdmin(

            Long id,

            UpdateAdminRequest request,

            User currentAdmin

    ) {

        // Only Master Admin can update admins
        validateMasterAdmin(currentAdmin);

        User admin = userRepository

                .findById(id)

                .orElseThrow(() ->

                        new RuntimeException(

                                "Admin not found."

                        )

                );

        // Ensure target user is an ADMIN
        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {

            throw new RuntimeException(

                    "Selected user is not an Admin."

            );

        }
        validateTargetAdmin(admin);

        // Prevent changing email to an existing email
        if (

                !admin.getEmail().equalsIgnoreCase(

                        request.getEmail()

                )

                        &&

                        userRepository.existsByEmail(

                                request.getEmail()

                        )

        ) {

            throw new RuntimeException(

                    "Email already exists."

            );

        }

        // Update basic information
        admin.setFullName(

                request.getFullName()

        );

        admin.setEmail(

                request.getEmail()

        );

        admin.setActive(

                request.isActive()

        );

        // Never change master admin privilege here
        // masterAdmin remains exactly as stored

        User updatedAdmin =

                userRepository.save(admin);

        return toResponse(updatedAdmin);

    }
        /* ==========================================
       DELETE ADMIN
    ========================================== */

    public void deleteAdmin(

            Long id,

            User currentAdmin

    ) {

        // Only Master Admin can delete admins
        validateMasterAdmin(currentAdmin);

        User admin = userRepository

                .findById(id)

                .orElseThrow(() ->

                        new RuntimeException(

                                "Admin not found."

                        )

                );

        // Ensure target user is an ADMIN
        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {

            throw new RuntimeException(

                    "Selected user is not an Admin."

            );

        }

        // Never delete the Master Admin
        validateTargetAdmin(admin);

        // Prevent deleting yourself
        if (

                admin.getId().equals(

                        currentAdmin.getId()

                )

        ) {

            throw new RuntimeException(

                    "You cannot delete your own account."

            );

        }

        userRepository.delete(admin);

    }
        /* ==========================================
       CHANGE ADMIN STATUS
    ========================================== */

    public AdminResponse changeAdminStatus(

            Long id,

            boolean active,

            User currentAdmin

    ) {

        // Only Master Admin
        validateMasterAdmin(currentAdmin);

        User admin = userRepository

                .findById(id)

                .orElseThrow(() ->

                        new RuntimeException(

                                "Admin not found."

                        )

                );

        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {

            throw new RuntimeException(

                    "Selected user is not an Admin."

            );

        }

        // Never deactivate Master Admin
        validateTargetAdmin(admin);

        admin.setActive(active);

        User savedAdmin = userRepository.save(admin);

        return toResponse(savedAdmin);

    }
    /* ==========================================
   ACTIVATE ADMIN
========================================== */

public AdminResponse activateAdmin(

        Long id,

        User currentAdmin

) {

    return changeAdminStatus(

            id,

            true,

            currentAdmin

    );

}

/* ==========================================
   DEACTIVATE ADMIN
========================================== */

public AdminResponse deactivateAdmin(

        Long id,

        User currentAdmin

) {

    return changeAdminStatus(

            id,

            false,

            currentAdmin

    );

}

    /* ==========================================
       CHANGE PASSWORD
    ========================================== */

    public void changePassword(

            Long id,

            String newPassword,

            User currentAdmin

    ) {

        validateMasterAdmin(currentAdmin);

        User admin = userRepository

                .findById(id)

                .orElseThrow(() ->

                        new RuntimeException(

                                "Admin not found."

                        )

                );

        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {

            throw new RuntimeException(

                    "Selected user is not an Admin."

            );

        }
        validateTargetAdmin(admin);

        admin.setPassword(

                passwordEncoder.encode(

                        newPassword

                )

        );

        userRepository.save(admin);

    }

    /* ==========================================
       RESET PASSWORD
    ========================================== */

    public String resetPassword(

            Long id,

            User currentAdmin

    ) {

        validateMasterAdmin(currentAdmin);

        User admin = userRepository

                .findById(id)

                .orElseThrow(() ->

                        new RuntimeException(

                                "Admin not found."

                        )

                );

        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {

            throw new RuntimeException(

                    "Selected user is not an Admin."

            );

        }
        validateTargetAdmin(admin);

        String temporaryPassword =

                "Admin@123";

        admin.setPassword(

                passwordEncoder.encode(

                        temporaryPassword

                )

        );

        userRepository.save(admin);

        return temporaryPassword;

    }

}