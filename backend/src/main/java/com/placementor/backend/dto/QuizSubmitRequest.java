package com.placementor.backend.dto;

import java.util.List;

public class QuizSubmitRequest {

    /* ==========================================
       QUIZ DETAILS
    ========================================== */

    private Long categoryId;

    private Long topicId;

    private String difficulty;

    private Integer timeTaken;

    /* ==========================================
       STUDENT ANSWERS
    ========================================== */

    private List<Answer> answers;

    /* ==========================================
       CONSTRUCTORS
    ========================================== */

    public QuizSubmitRequest() {
    }

    public QuizSubmitRequest(
            Long categoryId,
            Long topicId,
            String difficulty,
            Integer timeTaken,
            List<Answer> answers
    ) {

        this.categoryId = categoryId;
        this.topicId = topicId;
        this.difficulty = difficulty;
        this.timeTaken = timeTaken;
        this.answers = answers;

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

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getTimeTaken() {
        return timeTaken;
    }

    public void setTimeTaken(Integer timeTaken) {
        this.timeTaken = timeTaken;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    /* ==========================================
       INNER CLASS : ANSWER
    ========================================== */

    public static class Answer {

        private Long questionId;

        private String selectedAnswer;

        public Answer() {
        }

        public Answer(Long questionId, String selectedAnswer) {

            this.questionId = questionId;
            this.selectedAnswer = selectedAnswer;

        }

        public Long getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }

        public String getSelectedAnswer() {
            return selectedAnswer;
        }

        public void setSelectedAnswer(String selectedAnswer) {
            this.selectedAnswer = selectedAnswer;
        }

    }

}