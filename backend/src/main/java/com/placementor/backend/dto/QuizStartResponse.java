package com.placementor.backend.dto;

import java.util.List;

public class QuizStartResponse {

    /* ==========================================
       QUIZ DETAILS
    ========================================== */

    private Long categoryId;

    private String categoryName;

    private Long topicId;

    private String topicName;

    private String difficulty;

    private Integer totalQuestions;

    /* ==========================================
       QUESTIONS
    ========================================== */

    private List<QuestionResponse> questions;

    /* ==========================================
       CONSTRUCTORS
    ========================================== */

    public QuizStartResponse() {
    }

    public QuizStartResponse(
            Long categoryId,
            String categoryName,
            Long topicId,
            String topicName,
            String difficulty,
            Integer totalQuestions,
            List<QuestionResponse> questions
    ) {

        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.topicId = topicId;
        this.topicName = topicName;
        this.difficulty = difficulty;
        this.totalQuestions = totalQuestions;
        this.questions = questions;

    }

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public List<QuestionResponse> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionResponse> questions) {
        this.questions = questions;
    }

}