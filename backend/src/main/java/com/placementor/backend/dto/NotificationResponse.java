package com.placementor.backend.dto;

import java.time.LocalDateTime;

public class NotificationResponse {

    /* ==========================================
       ID
    ========================================== */

    private Long id;

    /* ==========================================
       TITLE
    ========================================== */

    private String title;

    /* ==========================================
       MESSAGE
    ========================================== */

    private String message;

    /* ==========================================
       TYPE
    ========================================== */

    private String type;

    /* ==========================================
       READ STATUS
    ========================================== */

    private boolean read;

    /* ==========================================
       CREATED TIME
    ========================================== */

    private LocalDateTime createdAt;

    public NotificationResponse() {
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
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}