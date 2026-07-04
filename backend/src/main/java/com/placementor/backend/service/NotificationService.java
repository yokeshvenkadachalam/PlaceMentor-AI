package com.placementor.backend.service;

import com.placementor.backend.dto.NotificationResponse;
import com.placementor.backend.entity.Student;

import java.util.List;

public interface NotificationService {

    /* ==========================================
       GET ALL NOTIFICATIONS
    ========================================== */

    List<NotificationResponse> getNotifications(
            String email
    );

    /* ==========================================
       CREATE NOTIFICATION
    ========================================== */

    void createNotification(

            Student student,

            String title,

            String message,

            String type

    );

    /* ==========================================
       MARK ONE AS READ
    ========================================== */

    void markAsRead(
            Long notificationId
    );

    /* ==========================================
       MARK ALL AS READ
    ========================================== */

    void markAllAsRead(
            String email
    );

    /* ==========================================
       DELETE ALL
    ========================================== */

    void clearNotifications(
            String email
    );

    /* ==========================================
       UNREAD COUNT
    ========================================== */

    long getUnreadCount(
            String email
    );

}