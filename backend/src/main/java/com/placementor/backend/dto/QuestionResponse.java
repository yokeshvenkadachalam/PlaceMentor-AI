package com.placementor.backend.dto;

public class QuestionResponse {

    /* ==========================================
       QUESTION ID
    ========================================== */

    private Long id;

    /* ==========================================
       CATEGORY
    ========================================== */

    private Long categoryId;

    private String categoryName;

    /* ==========================================
       TOPIC
    ========================================== */

    private Long topicId;

    private String topicName;

    /* ==========================================
       QUESTION
    ========================================== */

    private String question;

    /* ==========================================
       OPTIONS
    ========================================== */

    private String optionA;

    private String optionB;

    private String optionC;

    private String optionD;

    /* ==========================================
       DIFFICULTY
    ========================================== */

    private String difficulty;

    /* ==========================================
       MARKS
    ========================================== */

    private Integer marks;

    /* ==========================================
       CONSTRUCTORS
    ========================================== */

    public QuestionResponse() {
    }

    public QuestionResponse(
            Long id,
            Long categoryId,
            String categoryName,
            Long topicId,
            String topicName,
            String question,
            String optionA,
            String optionB,
            String optionC,
            String optionD,
            String difficulty,
            Integer marks
    ) {
        this.id = id;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.topicId = topicId;
        this.topicName = topicName;
        this.question = question;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.difficulty = difficulty;
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

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getOptionA() {
        return optionA;
    }

    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }

    public String getOptionB() {
        return optionB;
    }

    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }

    public String getOptionC() {
        return optionC;
    }

    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }

    public String getOptionD() {
        return optionD;
    }

    public void setOptionD(String optionD) {
        this.optionD = optionD;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getMarks() {
        return marks;
    }

    public void setMarks(Integer marks) {
        this.marks = marks;
    }

}