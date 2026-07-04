package com.placementor.backend.service;

import com.placementor.backend.dto.StudentRegistrationRequest;
import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegistrationService {

    @Autowired
    private UserService userService;

    @Autowired
    private StudentService studentService;

    /* ==========================================
       REGISTER STUDENT
    ========================================== */

    @Transactional
    public User registerStudent(StudentRegistrationRequest request) {

        /* ==========================
           CREATE USER
        ========================== */

        User user = new User();

        user.setFullName(request.getFullName());

        user.setEmail(request.getEmail());

        user.setPassword(request.getPassword());

        user.setRole(request.getRole());

        User savedUser = userService.registerUser(user);

        /* ==========================
           CREATE STUDENT PROFILE
        ========================== */

        Student student = studentService.createStudent(
                savedUser,
                request
        );

        return savedUser;

    }

}