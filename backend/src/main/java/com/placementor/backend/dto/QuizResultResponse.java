package com.placementor.backend.dto;

import java.util.List;

public class QuizResultResponse {

    /* ==========================================
       ATTEMPT DETAILS
    ========================================== */

    private Long attemptId;

    private Integer totalQuestions;

    private Integer correctAnswers;

    private Integer wrongAnswers;

    private Integer unanswered;

    private Integer totalMarks;

    private Integer obtainedMarks;

    private Double percentage;

    private Integer timeTaken;

    private boolean passed;

    /* ==========================================
       ANSWER REVIEW
    ========================================== */

    private List<QuestionResult> answers;

    /* ==========================================
       CONSTRUCTORS
    ========================================== */

    public QuizResultResponse() {
    }

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public Long getAttemptId() {
        return attemptId;
    }

    public void setAttemptId(Long attemptId) {
        this.attemptId = attemptId;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public Integer getWrongAnswers() {
        return wrongAnswers;
    }

    public void setWrongAnswers(Integer wrongAnswers) {
        this.wrongAnswers = wrongAnswers;
    }

    public Integer getUnanswered() {
        return unanswered;
    }

    public void setUnanswered(Integer unanswered) {
        this.unanswered = unanswered;
    }

    public Integer getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(Integer totalMarks) {
        this.totalMarks = totalMarks;
    }

    public Integer getObtainedMarks() {
        return obtainedMarks;
    }

    public void setObtainedMarks(Integer obtainedMarks) {
        this.obtainedMarks = obtainedMarks;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public Integer getTimeTaken() {
        return timeTaken;
    }

    public void setTimeTaken(Integer timeTaken) {
        this.timeTaken = timeTaken;
    }

    public boolean isPassed() {
        return passed;
    }

    public void setPassed(boolean passed) {
        this.passed = passed;
    }

    public List<QuestionResult> getAnswers() {
        return answers;
    }

    public void setAnswers(List<QuestionResult> answers) {
        this.answers = answers;
    }

    /* ==========================================
       INNER CLASS : QUESTION RESULT
    ========================================== */

    public static class QuestionResult {

        private Long questionId;

        private String question;

        private String selectedAnswer;

        private String correctAnswer;

        private boolean correct;

        private String explanation;

        private Integer marks;

        public QuestionResult() {
        }

        public QuestionResult(
                Long questionId,
                String question,
                String selectedAnswer,
                String correctAnswer,
                boolean correct,
                String explanation,
                Integer marks
        ) {

            this.questionId = questionId;
            this.question = question;
            this.selectedAnswer = selectedAnswer;
            this.correctAnswer = correctAnswer;
            this.correct = correct;
            this.explanation = explanation;
            this.marks = marks;

        }

        public Long getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public String getSelectedAnswer() {
            return selectedAnswer;
        }

        public void setSelectedAnswer(String selectedAnswer) {
            this.selectedAnswer = selectedAnswer;
        }

        public String getCorrectAnswer() {
            return correctAnswer;
        }

        public void setCorrectAnswer(String correctAnswer) {
            this.correctAnswer = correctAnswer;
        }

        public boolean isCorrect() {
            return correct;
        }

        public void setCorrect(boolean correct) {
            this.correct = correct;
        }

        public String getExplanation() {
            return explanation;
        }

        public void setExplanation(String explanation) {
            this.explanation = explanation;
        }

        public Integer getMarks() {
            return marks;
        }

        public void setMarks(Integer marks) {
            this.marks = marks;
        }

    }

}