package com.placementor.backend.dto;

public class UpdateTopicRequest {

    private String name;

    private String category;

    private boolean active;

    public UpdateTopicRequest() {
    }

    public UpdateTopicRequest(
            String name,
            String category,
            boolean active
    ) {
        this.name = name;
        this.category = category;
        this.active = active;
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

}