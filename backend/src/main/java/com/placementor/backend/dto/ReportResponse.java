package com.placementor.backend.dto;

import java.util.List;

public class ReportResponse {

    /* ==========================================
       SUMMARY
    ========================================== */

    private int totalTests;

    private double highestScore;

    private double averageScore;

    private double accuracy;

    private int passed;

    private int failed;

    /* ==========================================
       HISTORY
    ========================================== */

    private List<QuizHistoryResponse> history;

    /* ==========================================
       TOPIC ANALYSIS
    ========================================== */

    private List<TopicPerformance> strongTopics;

    private List<TopicPerformance> weakTopics;

    public ReportResponse() {
    }

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public int getTotalTests() {
        return totalTests;
    }

    public void setTotalTests(int totalTests) {
        this.totalTests = totalTests;
    }

    public double getHighestScore() {
        return highestScore;
    }

    public void setHighestScore(double highestScore) {
        this.highestScore = highestScore;
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

    public int getPassed() {
        return passed;
    }

    public void setPassed(int passed) {
        this.passed = passed;
    }

    public int getFailed() {
        return failed;
    }

    public void setFailed(int failed) {
        this.failed = failed;
    }

    public List<QuizHistoryResponse> getHistory() {
        return history;
    }

    public void setHistory(List<QuizHistoryResponse> history) {
        this.history = history;
    }

    public List<TopicPerformance> getStrongTopics() {
        return strongTopics;
    }

    public void setStrongTopics(List<TopicPerformance> strongTopics) {
        this.strongTopics = strongTopics;
    }

    public List<TopicPerformance> getWeakTopics() {
        return weakTopics;
    }

    public void setWeakTopics(List<TopicPerformance> weakTopics) {
        this.weakTopics = weakTopics;
    }

}