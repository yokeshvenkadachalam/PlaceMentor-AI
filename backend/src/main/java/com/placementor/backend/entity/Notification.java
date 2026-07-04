package com.placementor.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

    /* ==========================================
       ID
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
       TITLE
    ========================================== */

    @Column(nullable = false, length = 100)
    private String title;

    /* ==========================================
       MESSAGE
    ========================================== */

    @Column(nullable = false, length = 500)
    private String message;

    /* ==========================================
       TYPE
    ========================================== */

    @Column(nullable = false, length = 30)
    private String type;

    /*
        Examples

        QUIZ
        XP
        LEVEL
        STREAK
        ACHIEVEMENT
        SYSTEM
    */

    /* ==========================================
       READ STATUS
    ========================================== */

    @Column(nullable = false)
    private boolean isRead = false;

    /* ==========================================
       CREATED TIME
    ========================================== */

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    /* ==========================================
       CONSTRUCTORS
    ========================================== */

    public Notification() {
    }

    public Notification(Student student,
                        String title,
                        String message,
                        String type) {

        this.student = student;
        this.title = title;
        this.message = message;
        this.type = type;
        this.createdAt = LocalDateTime.now();
        this.isRead = false;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}