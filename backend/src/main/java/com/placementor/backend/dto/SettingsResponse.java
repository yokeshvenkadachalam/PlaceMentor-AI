package com.placementor.backend.dto;

public class SettingsResponse {

    /* ==========================================
       ACCOUNT
    ========================================== */

    private String studentId;

    private String fullName;

    private String email;

    /* ==========================================
       APPEARANCE
    ========================================== */

    private String theme;

    public SettingsResponse() {
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
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

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

}