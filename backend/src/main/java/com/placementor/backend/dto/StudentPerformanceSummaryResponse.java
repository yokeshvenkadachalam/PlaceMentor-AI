package com.placementor.backend.dto;

import java.time.LocalDateTime;

public class StudentPerformanceSummaryResponse {

    /* ==========================================
       STUDENT DETAILS
    ========================================== */

    private String studentId;

    private String studentName;

    private String email;

    /* ==========================================
       PERFORMANCE
    ========================================== */

    private int totalAttempts;

    private double averagePercentage;

    private double bestPercentage;

    private double worstPercentage;

    private long passCount;

    private long failCount;

    private LocalDateTime lastAttempt;

    public StudentPerformanceSummaryResponse() {
    }

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getTotalAttempts() {
        return totalAttempts;
    }

    public void setTotalAttempts(int totalAttempts) {
        this.totalAttempts = totalAttempts;
    }

    public double getAveragePercentage() {
        return averagePercentage;
    }

    public void setAveragePercentage(double averagePercentage) {
        this.averagePercentage = averagePercentage;
    }

    public double getBestPercentage() {
        return bestPercentage;
    }

    public void setBestPercentage(double bestPercentage) {
        this.bestPercentage = bestPercentage;
    }

    public double getWorstPercentage() {
        return worstPercentage;
    }

    public void setWorstPercentage(double worstPercentage) {
        this.worstPercentage = worstPercentage;
    }

    public long getPassCount() {
        return passCount;
    }

    public void setPassCount(long passCount) {
        this.passCount = passCount;
    }

    public long getFailCount() {
        return failCount;
    }

    public void setFailCount(long failCount) {
        this.failCount = failCount;
    }

    public LocalDateTime getLastAttempt() {
        return lastAttempt;
    }

    public void setLastAttempt(LocalDateTime lastAttempt) {
        this.lastAttempt = lastAttempt;
    }

}