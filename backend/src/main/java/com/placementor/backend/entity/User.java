package com.placementor.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String fullName;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @NotBlank
    @Size(min = 6)
    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true, length = 30)
    private String userId;

    @Column(nullable = false, length = 30)
    private String role;

    @Column(nullable = false)
    private boolean verified = false;

    @Column(nullable = false)
    private boolean active = true;

    // ==========================================
    // MASTER ADMIN
    // ==========================================

    @Column(name = "is_master_admin", nullable = false)
    private boolean masterAdmin = false;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {
    }

    public User(
            Long id,
            String fullName,
            String email,
            String password,
            String userId,
            String role,
            boolean verified,
            boolean active,
            boolean masterAdmin,
            LocalDateTime createdAt
    ) {

        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.userId = userId;
        this.role = role;
        this.verified = verified;
        this.active = active;
        this.masterAdmin = masterAdmin;
        this.createdAt = createdAt;

    }

    // ==========================================
    // ID
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // ==========================================
    // FULL NAME
    // ==========================================

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    // ==========================================
    // EMAIL
    // ==========================================

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // ==========================================
    // PASSWORD
    // ==========================================

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // ==========================================
    // USER ID
    // ==========================================

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    // ==========================================
    // ROLE
    // ==========================================

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // ==========================================
    // VERIFIED
    // ==========================================

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    // ==========================================
    // ACTIVE
    // ==========================================

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    // ==========================================
    // MASTER ADMIN
    // ==========================================

    public boolean isMasterAdmin() {
        return masterAdmin;
    }

    public void setMasterAdmin(boolean masterAdmin) {
        this.masterAdmin = masterAdmin;
    }

    // ==========================================
    // CREATED AT
    // ==========================================

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}