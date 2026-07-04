package com.placementor.backend.dto;

public class LevelResponse {

    /* ==========================================
       CURRENT XP
    ========================================== */

    private int xp;

    /* ==========================================
       CURRENT LEVEL
    ========================================== */

    private int level;

    /* ==========================================
       CURRENT LEVEL START XP
    ========================================== */

    private int currentLevelXP;

    /* ==========================================
       NEXT LEVEL XP
    ========================================== */

    private int nextLevelXP;

    /* ==========================================
       REMAINING XP
    ========================================== */

    private int remainingXP;

    /* ==========================================
       PROGRESS %
    ========================================== */

    private int progress;

    public LevelResponse() {
    }

    public int getXp() {
        return xp;
    }

    public void setXp(int xp) {
        this.xp = xp;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getCurrentLevelXP() {
        return currentLevelXP;
    }

    public void setCurrentLevelXP(int currentLevelXP) {
        this.currentLevelXP = currentLevelXP;
    }

    public int getNextLevelXP() {
        return nextLevelXP;
    }

    public void setNextLevelXP(int nextLevelXP) {
        this.nextLevelXP = nextLevelXP;
    }

    public int getRemainingXP() {
        return remainingXP;
    }

    public void setRemainingXP(int remainingXP) {
        this.remainingXP = remainingXP;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }
}