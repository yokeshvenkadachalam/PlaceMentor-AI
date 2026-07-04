package com.placementor.backend.dto;

import com.placementor.backend.entity.Difficulty;

public class QuizStartRequest {

    /* ==========================================
       CATEGORY
    ========================================== */

    private Long categoryId;

    /* ==========================================
       TOPIC
    ========================================== */

    private Long topicId;

    /* ==========================================
       DIFFICULTY
    ========================================== */

    private Difficulty difficulty;

    /* ==========================================
       NUMBER OF QUESTIONS
    ========================================== */

    private Integer numberOfQuestions;

    /* ==========================================
       CONSTRUCTORS
    ========================================== */

    public QuizStartRequest() {
    }

    public QuizStartRequest(
            Long categoryId,
            Long topicId,
            Difficulty difficulty,
            Integer numberOfQuestions
    ) {
        this.categoryId = categoryId;
        this.topicId = topicId;
        this.difficulty = difficulty;
        this.numberOfQuestions = numberOfQuestions;
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

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getNumberOfQuestions() {
        return numberOfQuestions;
    }

    public void setNumberOfQuestions(Integer numberOfQuestions) {
        this.numberOfQuestions = numberOfQuestions;
    }

}