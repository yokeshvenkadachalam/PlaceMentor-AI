package com.placementor.backend.controller;

import com.placementor.backend.dto.LoginRequest;
import com.placementor.backend.dto.StudentRegistrationRequest;
import com.placementor.backend.entity.User;
import com.placementor.backend.security.JwtUtil;
import com.placementor.backend.service.RegistrationService;
import com.placementor.backend.service.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    /* ==========================================
       REGISTER
    ========================================== */

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(

            @Valid @RequestBody StudentRegistrationRequest request

    ) {

        try {

            User savedUser = registrationService.registerStudent(request);

            Map<String, Object> response = new HashMap<>();

            response.put("success", true);
            response.put("message", "Registration Successful");

            response.put("studentId", savedUser.getUserId());
            response.put("name", savedUser.getFullName());
            response.put("email", savedUser.getEmail());
            response.put("role", savedUser.getRole());

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            Map<String, Object> error = new HashMap<>();

            error.put("success", false);
            error.put("message", e.getMessage());

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error);

        }

    }

    /* ==========================================
       LOGIN
    ========================================== */

    @PostMapping("/login")
    public ResponseEntity<?> login(

            @Valid @RequestBody LoginRequest request

    ) {

        Optional<User> user = userService.login(

                request.getEmail(),
                request.getPassword()

        );

        if (user.isEmpty()) {

            Map<String, Object> error = new HashMap<>();

            error.put("success", false);
            error.put("message", "Invalid Email or Password");

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(error);

        }

        User loggedUser = user.get();

        String token = jwtUtil.generateToken(
                loggedUser.getEmail()
        );

        Map<String, Object> response = new HashMap<>();

        response.put("success", true);
        response.put("message", "Login Successful");

        response.put("token", token);

        response.put("studentId", loggedUser.getUserId());
        response.put("name", loggedUser.getFullName());
        response.put("email", loggedUser.getEmail());
        response.put("role", loggedUser.getRole());
        response.put("masterAdmin", loggedUser.isMasterAdmin());

        return ResponseEntity.ok(response);

    }

    /* ==========================================
   PROFILE
========================================== */

@GetMapping("/profile")
public ResponseEntity<?> getProfile(
        Authentication authentication
) {

    if (authentication == null) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Unauthorized");

    }

    User currentUser = (User) authentication.getPrincipal();

    Map<String, Object> response = new HashMap<>();

    response.put("studentId", currentUser.getUserId());
    response.put("name", currentUser.getFullName());
    response.put("email", currentUser.getEmail());
    response.put("role", currentUser.getRole());
    response.put("masterAdmin", currentUser.isMasterAdmin());

    return ResponseEntity.ok(response);

}
}