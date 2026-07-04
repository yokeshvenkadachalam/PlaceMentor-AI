package com.placementor.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "student_daily_challenges")
public class StudentDailyChallenge {

    /* ==========================================
       PRIMARY KEY
    ========================================== */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ==========================================
       STUDENT
    ========================================== */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    /* ==========================================
       DAILY CHALLENGE
    ========================================== */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    private DailyChallenge challenge;

    /* ==========================================
       CHALLENGE DATE
    ========================================== */

    @Column(nullable = false)
    private LocalDate challengeDate = LocalDate.now();

    /* ==========================================
       CURRENT PROGRESS
    ========================================== */

    @Column(nullable = false)
    private int progress = 0;

    /* ==========================================
       COMPLETED
    ========================================== */

    @Column(nullable = false)
    private boolean completed = false;

    /* ==========================================
       REWARD CLAIMED
    ========================================== */

    @Column(nullable = false)
    private boolean rewardClaimed = false;

    public StudentDailyChallenge() {
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

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public DailyChallenge getChallenge() {
        return challenge;
    }

    public void setChallenge(DailyChallenge challenge) {
        this.challenge = challenge;
    }

    public LocalDate getChallengeDate() {
        return challengeDate;
    }

    public void setChallengeDate(LocalDate challengeDate) {
        this.challengeDate = challengeDate;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public boolean isRewardClaimed() {
        return rewardClaimed;
    }

    public void setRewardClaimed(boolean rewardClaimed) {
        this.rewardClaimed = rewardClaimed;
    }

}