package com.placementor.backend.dto;

public class AdminResponse {

    private Long id;

    private String userId;

    private String fullName;

    private String email;

    private boolean active;

    private boolean masterAdmin;

    public AdminResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isMasterAdmin() {
        return masterAdmin;
    }

    public void setMasterAdmin(boolean masterAdmin) {
        this.masterAdmin = masterAdmin;
    }

}