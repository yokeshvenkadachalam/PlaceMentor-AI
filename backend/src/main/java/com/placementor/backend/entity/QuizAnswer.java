package com.placementor.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz_answers")
public class QuizAnswer {

    /* ==========================================
       PRIMARY KEY
    ========================================== */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ==========================================
       QUIZ ATTEMPT
    ========================================== */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "attempt_id",
            nullable = false
    )
    private QuizAttempt attempt;

    /* ==========================================
       QUESTION
    ========================================== */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "question_id",
            nullable = false
    )
    private Question question;

    /* ==========================================
       ANSWERS
    ========================================== */

    @Column(name = "selected_answer", length = 1)
    private String selectedAnswer;

    @Column(name = "correct_answer", length = 1)
    private String correctAnswer;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    private Integer marks;

    /* ==========================================
       CONSTRUCTORS
    ========================================== */

    public QuizAnswer() {
    }

    public QuizAnswer(
            Long id,
            QuizAttempt attempt,
            Question question,
            String selectedAnswer,
            String correctAnswer,
            Boolean isCorrect,
            Integer marks
    ) {

        this.id = id;
        this.attempt = attempt;
        this.question = question;
        this.selectedAnswer = selectedAnswer;
        this.correctAnswer = correctAnswer;
        this.isCorrect = isCorrect;
        this.marks = marks;

    }

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public QuizAttempt getAttempt() {
        return attempt;
    }

    public void setAttempt(QuizAttempt attempt) {
        this.attempt = attempt;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
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

    public Boolean getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public Integer getMarks() {
        return marks;
    }

    public void setMarks(Integer marks) {
        this.marks = marks;
    }

}