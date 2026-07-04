package com.placementor.backend.repository;

import com.placementor.backend.entity.Notification;
import com.placementor.backend.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    /* ==========================================
       ALL NOTIFICATIONS OF A STUDENT
    ========================================== */

    List<Notification> findByStudentOrderByCreatedAtDesc(
            Student student
    );

    /* ==========================================
       UNREAD NOTIFICATIONS
    ========================================== */

    List<Notification> findByStudentAndIsReadFalseOrderByCreatedAtDesc(
            Student student
    );

    /* ==========================================
       COUNT UNREAD
    ========================================== */

    long countByStudentAndIsReadFalse(
            Student student
    );
    void deleteByStudent(Student student);

}