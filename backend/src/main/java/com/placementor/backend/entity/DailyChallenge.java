package com.placementor.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "daily_challenges")
public class DailyChallenge {

    /* ==========================================
       PRIMARY KEY
    ========================================== */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ==========================================
       TITLE
    ========================================== */

    @Column(nullable = false, length = 100)
    private String title;

    /* ==========================================
       DESCRIPTION
    ========================================== */

    @Column(length = 500)
    private String description;

    /* ==========================================
       CHALLENGE TYPE
       QUIZZES
       QUESTIONS
       SCORE
       TIME
    ========================================== */

    @Column(nullable = false, length = 30)
    private String type;

    /* ==========================================
       TARGET VALUE
    ========================================== */

    @Column(nullable = false)
    private int target;

    /* ==========================================
       XP REWARD
    ========================================== */

    @Column(nullable = false)
    private int xpReward;

    /* ==========================================
       ACTIVE
    ========================================== */

    @Column(nullable = false)
    private boolean active = true;

    public DailyChallenge() {
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getTarget() {
        return target;
    }

    public void setTarget(int target) {
        this.target = target;
    }

    public int getXpReward() {
        return xpReward;
    }

    public void setXpReward(int xpReward) {
        this.xpReward = xpReward;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

}