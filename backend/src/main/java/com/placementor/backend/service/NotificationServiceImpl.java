package com.placementor.backend.service;

import com.placementor.backend.dto.NotificationResponse;
import com.placementor.backend.entity.Notification;
import com.placementor.backend.entity.Student;
import com.placementor.backend.repository.NotificationRepository;
import com.placementor.backend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl
        implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private StudentRepository studentRepository;

    /* ==========================================
   GET STUDENT
========================================== */

private Student getStudent(String email) {

    return studentRepository

            .findByUser_Email(email)

            .orElseThrow(() ->

                    new RuntimeException("Student not found"));

}

    /* ==========================================
       GET ALL NOTIFICATIONS
    ========================================== */

    @Override
    public List<NotificationResponse> getNotifications(
            String email
    ) {

        Student student = getStudent(email);

        return notificationRepository

                .findByStudentOrderByCreatedAtDesc(student)

                .stream()

                .map(this::convert)

                .collect(Collectors.toList());

    }

    /* ==========================================
       CREATE NOTIFICATION
    ========================================== */

    @Override
    public void createNotification(

            Student student,

            String title,

            String message,

            String type

    ) {

        Notification notification =
                new Notification();

        notification.setStudent(student);

        notification.setTitle(title);

        notification.setMessage(message);

        notification.setType(type);

        notification.setRead(false);

        notificationRepository.save(notification);

    }

    /* ==========================================
       MARK AS READ
    ========================================== */

    @Override
    public void markAsRead(Long notificationId) {

        Notification notification =

                notificationRepository

                        .findById(notificationId)

                        .orElseThrow(() ->
                                new RuntimeException("Notification not found"));

        notification.setRead(true);

        notificationRepository.save(notification);

    }

    /* ==========================================
       MARK ALL AS READ
    ========================================== */

    @Override
    public void markAllAsRead(String email) {

        Student student = getStudent(email);

        List<Notification> notifications =

                notificationRepository

                        .findByStudentAndIsReadFalseOrderByCreatedAtDesc(student);

        notifications.forEach(n -> n.setRead(true));

        notificationRepository.saveAll(notifications);

    }

    /* ==========================================
       CLEAR ALL
    ========================================== */

    @Override
    public void clearNotifications(String email) {

        Student student = getStudent(email);

        List<Notification> notifications =

                notificationRepository

                        .findByStudentOrderByCreatedAtDesc(student);

        notificationRepository.deleteAll(notifications);

    }

    /* ==========================================
       UNREAD COUNT
    ========================================== */

    @Override
    public long getUnreadCount(String email) {

        Student student = getStudent(email);

        return notificationRepository

                .countByStudentAndIsReadFalse(student);

    }

    /* ==========================================
       DTO CONVERTER
    ========================================== */

    private NotificationResponse convert(
            Notification notification
    ) {

        NotificationResponse response =
                new NotificationResponse();

        response.setId(notification.getId());

        response.setTitle(notification.getTitle());

        response.setMessage(notification.getMessage());

        response.setType(notification.getType());

        response.setRead(notification.isRead());

        response.setCreatedAt(notification.getCreatedAt());

        return response;

    }

}