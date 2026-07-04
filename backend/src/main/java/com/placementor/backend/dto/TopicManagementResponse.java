package com.placementor.backend.dto;

import java.util.List;

public class TopicManagementResponse {

    /* ==========================================
       SUMMARY
    ========================================== */

    private int totalTopics;

    private int activeTopics;

    private int inactiveTopics;

    /* ==========================================
       TOPIC LIST
    ========================================== */

    private List<TopicCardResponse> topics;

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public int getTotalTopics() {
        return totalTopics;
    }

    public void setTotalTopics(int totalTopics) {
        this.totalTopics = totalTopics;
    }

    public int getActiveTopics() {
        return activeTopics;
    }

    public void setActiveTopics(int activeTopics) {
        this.activeTopics = activeTopics;
    }

    public int getInactiveTopics() {
        return inactiveTopics;
    }

    public void setInactiveTopics(int inactiveTopics) {
        this.inactiveTopics = inactiveTopics;
    }

    public List<TopicCardResponse> getTopics() {
        return topics;
    }

    public void setTopics(List<TopicCardResponse> topics) {
        this.topics = topics;
    }

}