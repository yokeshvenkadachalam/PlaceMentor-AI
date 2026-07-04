package com.placementor.backend.controller;

import com.placementor.backend.dto.NotificationResponse;
import com.placementor.backend.entity.User;
import com.placementor.backend.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    /* ==========================================
       GET LOGGED-IN USER
    ========================================== */

    private String getEmail() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        User user =
                (User) authentication.getPrincipal();

        return user.getEmail();

    }

    /* ==========================================
       GET ALL NOTIFICATIONS
    ========================================== */

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getNotifications() {

        return ResponseEntity.ok(

                notificationService.getNotifications(

                        getEmail()

                )

        );

    }

    /* ==========================================
       UNREAD COUNT
    ========================================== */

    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount() {

        return ResponseEntity.ok(

                notificationService.getUnreadCount(

                        getEmail()

                )

        );

    }

    /* ==========================================
       MARK AS READ
    ========================================== */

    @PutMapping("/{id}/read")
    public ResponseEntity<String> markAsRead(

            @PathVariable Long id

    ) {

        notificationService.markAsRead(id);

        return ResponseEntity.ok(

                "Notification marked as read."

        );

    }

    /* ==========================================
       MARK ALL AS READ
    ========================================== */

    @PutMapping("/read-all")
    public ResponseEntity<String> markAllAsRead() {

        notificationService.markAllAsRead(

                getEmail()

        );

        return ResponseEntity.ok(

                "All notifications marked as read."

        );

    }

    /* ==========================================
       CLEAR ALL
    ========================================== */

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearNotifications() {

        notificationService.clearNotifications(

                getEmail()

        );

        return ResponseEntity.ok(

                "All notifications deleted."

        );

    }

}