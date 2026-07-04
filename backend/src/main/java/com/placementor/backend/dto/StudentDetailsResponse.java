package com.placementor.backend.dto;

import java.util.List;

public class StudentDetailsResponse {

    /* ==========================================
       BASIC DETAILS
    ========================================== */

    private String studentId;

    private String name;

    private String email;

    private String mobile;

    private String college;

    private String department;

    private String yearOfStudy;

    private String profileImage;

    private String status;

    /* ==========================================
       QUIZ STATISTICS
    ========================================== */

    private int totalAttempts;

    private double averageScore;

    private double highestScore;

    private double accuracy;

    private int xp;

    private String badge;

    /* ==========================================
       RECENT QUIZZES
    ========================================== */

    private List<RecentQuizResponse> recentQuizzes;

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getYearOfStudy() {
        return yearOfStudy;
    }

    public void setYearOfStudy(String yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getTotalAttempts() {
        return totalAttempts;
    }

    public void setTotalAttempts(int totalAttempts) {
        this.totalAttempts = totalAttempts;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public double getHighestScore() {
        return highestScore;
    }

    public void setHighestScore(double highestScore) {
        this.highestScore = highestScore;
    }

    public double getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(double accuracy) {
        this.accuracy = accuracy;
    }

    public int getXp() {
        return xp;
    }

    public void setXp(int xp) {
        this.xp = xp;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public List<RecentQuizResponse> getRecentQuizzes() {
        return recentQuizzes;
    }

    public void setRecentQuizzes(List<RecentQuizResponse> recentQuizzes) {
        this.recentQuizzes = recentQuizzes;
    }

}