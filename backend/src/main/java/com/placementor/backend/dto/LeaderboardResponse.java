package com.placementor.backend.dto;

public class LeaderboardResponse {

    /* ==========================================
       RANK
    ========================================== */

    private int rank;

    /* ==========================================
       STUDENT DETAILS
    ========================================== */

    private String studentId;

    private String studentName;

    private String profileImage;

    /* ==========================================
       PERFORMANCE
    ========================================== */

    private int totalTests;

    private double averageScore;

    private double accuracy;

    /* ==========================================
       GAMIFICATION
    ========================================== */

    private int xp;

    private String badge;

    /* ==========================================
       CONSTRUCTORS
    ========================================== */

    public LeaderboardResponse() {
    }

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public int getTotalTests() {
        return totalTests;
    }

    public void setTotalTests(int totalTests) {
        this.totalTests = totalTests;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
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

}