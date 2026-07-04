package com.placementor.backend.dto;

import java.time.LocalDate;

public class StreakResponse {

    /* ==========================================
       CURRENT STREAK
    ========================================== */

    private int currentStreak;

    /* ==========================================
       LONGEST STREAK
    ========================================== */

    private int longestStreak;

    /* ==========================================
       LAST PRACTICE DATE
    ========================================== */

    private LocalDate lastPracticeDate;

    public StreakResponse() {
    }

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public int getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(int currentStreak) {
        this.currentStreak = currentStreak;
    }

    public int getLongestStreak() {
        return longestStreak;
    }

    public void setLongestStreak(int longestStreak) {
        this.longestStreak = longestStreak;
    }

    public LocalDate getLastPracticeDate() {
        return lastPracticeDate;
    }

    public void setLastPracticeDate(LocalDate lastPracticeDate) {
        this.lastPracticeDate = lastPracticeDate;
    }

}