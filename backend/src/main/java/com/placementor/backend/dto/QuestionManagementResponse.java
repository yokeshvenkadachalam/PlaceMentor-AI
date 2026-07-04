package com.placementor.backend.dto;

import java.util.List;

public class QuestionManagementResponse {

    private long totalQuestions;

    private long easyQuestions;

    private long mediumQuestions;

    private long hardQuestions;

    private List<QuestionCardResponse> questions;

    public QuestionManagementResponse() {
    }

    public long getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(long totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public long getEasyQuestions() {
        return easyQuestions;
    }

    public void setEasyQuestions(long easyQuestions) {
        this.easyQuestions = easyQuestions;
    }

    public long getMediumQuestions() {
        return mediumQuestions;
    }

    public void setMediumQuestions(long mediumQuestions) {
        this.mediumQuestions = mediumQuestions;
    }

    public long getHardQuestions() {
        return hardQuestions;
    }

    public void setHardQuestions(long hardQuestions) {
        this.hardQuestions = hardQuestions;
    }

    public List<QuestionCardResponse> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionCardResponse> questions) {
        this.questions = questions;
    }

}