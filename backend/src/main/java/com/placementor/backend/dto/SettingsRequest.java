package com.placementor.backend.dto;

public class SettingsRequest {

    /* ==========================================
       ACCOUNT
    ========================================== */

    private String fullName;

    private String email;

    private String password;

    /* ==========================================
       APPEARANCE
    ========================================== */

    private String theme;

    public SettingsRequest() {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

}