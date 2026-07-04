package com.placementor.backend.dto;

public class RecentQuizResponse {

    /* ==========================================
       QUIZ DETAILS
    ========================================== */

    private String topic;

    private String category;

    private String difficulty;

    private double score;

    private String completedAt;

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(String completedAt) {
        this.completedAt = completedAt;
    }

}