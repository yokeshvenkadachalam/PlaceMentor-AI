package com.placementor.backend.repository;

import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    /* ==========================================
       FIND BY USER
    ========================================== */

    Optional<Student> findByUser(User user);

    /* ==========================================
       FIND BY USER ID
    ========================================== */

    Optional<Student> findByUser_UserId(String userId);

    /* ==========================================
       FIND BY EMAIL
    ========================================== */

    Optional<Student> findByUser_Email(String email);

    /* ==========================================
       CHECK PROFILE EXISTS
    ========================================== */

    boolean existsByUser(User user);

    /* ==========================================
       CHECK USER ID EXISTS
    ========================================== */

    boolean existsByUser_UserId(String userId);

}