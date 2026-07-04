package com.placementor.backend.dto;

public class TopicDetailsResponse {

    private Long id;

    private String name;

    private String category;

    private boolean active;

    private long totalQuestions;

    public TopicDetailsResponse() {
    }

    public TopicDetailsResponse(
            Long id,
            String name,
            String category,
            boolean active,
            long totalQuestions
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.active = active;
        this.totalQuestions = totalQuestions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public long getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(long totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

}