package com.placementor.backend.dto;

import java.util.List;

public class AdminDashboardResponse {

    /* ==========================================
       SUMMARY
    ========================================== */

    private long totalStudents;

    private long totalQuestions;

    private long totalQuizAttempts;

    private double averageScore;

    private long resumeCount;

    private long notificationCount;

    /* ==========================================
       DASHBOARD DATA
    ========================================== */

    private List<RecentStudentResponse> recentStudents;

    private List<RecentActivityResponse> recentActivities;

    private List<StudentGrowthResponse> studentGrowth;

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(long totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public long getTotalQuizAttempts() {
        return totalQuizAttempts;
    }

    public void setTotalQuizAttempts(long totalQuizAttempts) {
        this.totalQuizAttempts = totalQuizAttempts;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public long getResumeCount() {
        return resumeCount;
    }

    public void setResumeCount(long resumeCount) {
        this.resumeCount = resumeCount;
    }

    public long getNotificationCount() {
        return notificationCount;
    }

    public void setNotificationCount(long notificationCount) {
        this.notificationCount = notificationCount;
    }

    public List<RecentStudentResponse> getRecentStudents() {
        return recentStudents;
    }

    public void setRecentStudents(List<RecentStudentResponse> recentStudents) {
        this.recentStudents = recentStudents;
    }

    public List<RecentActivityResponse> getRecentActivities() {
        return recentActivities;
    }

    public void setRecentActivities(List<RecentActivityResponse> recentActivities) {
        this.recentActivities = recentActivities;
    }

    public List<StudentGrowthResponse> getStudentGrowth() {
        return studentGrowth;
    }

    public void setStudentGrowth(List<StudentGrowthResponse> studentGrowth) {
        this.studentGrowth = studentGrowth;
    }

}