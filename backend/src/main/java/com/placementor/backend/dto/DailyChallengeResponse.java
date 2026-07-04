package com.placementor.backend.dto;

public class DailyChallengeResponse {

    /* ==========================================
       CHALLENGE ID
    ========================================== */

    private Long id;

    /* ==========================================
       TITLE
    ========================================== */

    private String title;

    /* ==========================================
       DESCRIPTION
    ========================================== */

    private String description;

    /* ==========================================
       XP REWARD
    ========================================== */

    private int xpReward;

    /* ==========================================
       CURRENT PROGRESS
    ========================================== */

    private int progress;

    /* ==========================================
       TARGET
    ========================================== */

    private int target;

    /* ==========================================
       COMPLETED
    ========================================== */

    private boolean completed;

    public DailyChallengeResponse() {
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getXpReward() {
        return xpReward;
    }

    public void setXpReward(int xpReward) {
        this.xpReward = xpReward;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public int getTarget() {
        return target;
    }

    public void setTarget(int target) {
        this.target = target;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

}