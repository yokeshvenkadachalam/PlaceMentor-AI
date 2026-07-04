package com.placementor.backend.dto;

public class TopicPerformance {

    /* ==========================================
       TOPIC DETAILS
    ========================================== */

    private String category;

    private String topic;

    private int attempts;

    private double averageScore;

    private double percentage;

    /* ==========================================
       CONSTRUCTORS
    ========================================== */

    public TopicPerformance() {
    }

    public TopicPerformance(
            String category,
            String topic,
            int attempts,
            double averageScore,
            double percentage
    ) {
        this.category = category;
        this.topic = topic;
        this.attempts = attempts;
        this.averageScore = averageScore;
        this.percentage = percentage;
    }

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public int getAttempts() {
        return attempts;
    }

    public void setAttempts(int attempts) {
        this.attempts = attempts;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

}