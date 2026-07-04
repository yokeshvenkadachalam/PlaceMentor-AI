package com.placementor.backend.repository;

import com.placementor.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /* ==========================================
       LOGIN
    ========================================== */

    Optional<User> findByEmail(String email);

    Optional<User> findByUserId(String userId);

    boolean existsByEmail(String email);

    boolean existsByUserId(String userId);

    /* ==========================================
       USER ID GENERATOR
    ========================================== */

    Optional<User> findTopByUserIdStartingWithOrderByUserIdDesc(String prefix);

    /* ==========================================
       ADMIN MANAGEMENT
    ========================================== */

    // Get all admins
    List<User> findByRole(String role);

    // Get only active admins
    List<User> findByRoleAndActiveTrue(String role);

    // Count admins
    long countByRole(String role);

    // Count master admins
    long countByRoleAndMasterAdminTrue(String role);

    // Find master admin
    Optional<User> findByMasterAdminTrue();

    // Check if email already belongs to an admin
    boolean existsByEmailAndRole(String email, String role);

}