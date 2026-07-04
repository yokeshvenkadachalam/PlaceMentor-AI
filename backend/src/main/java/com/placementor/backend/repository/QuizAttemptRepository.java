package com.placementor.backend.repository;

import com.placementor.backend.entity.Category;
import com.placementor.backend.entity.QuizAttempt;
import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.Topic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface QuizAttemptRepository
        extends JpaRepository<QuizAttempt, Long> {

    /* ==========================================
       STUDENT QUIZ HISTORY
    ========================================== */

    List<QuizAttempt> findByStudentOrderByCompletedAtDesc(
            Student student
    );

    /* ==========================================
       LATEST ATTEMPT
    ========================================== */

    Optional<QuizAttempt> findTopByStudentOrderByCompletedAtDesc(
            Student student
    );

    /* ==========================================
       CATEGORY HISTORY
    ========================================== */

    List<QuizAttempt> findByStudentAndCategoryOrderByCompletedAtDesc(
            Student student,
            Category category
    );

    /* ==========================================
       TOPIC HISTORY
    ========================================== */

    List<QuizAttempt> findByStudentAndTopicOrderByCompletedAtDesc(
            Student student,
            Topic topic
    );

    /* ==========================================
       CATEGORY + TOPIC HISTORY
    ========================================== */

    List<QuizAttempt> findByStudentAndCategoryAndTopicOrderByCompletedAtDesc(
            Student student,
            Category category,
            Topic topic
    );

    /* ==========================================
       TOP SCORE
    ========================================== */

    Optional<QuizAttempt> findTopByStudentOrderByPercentageDesc(
            Student student
    );

   //  /* ==========================================
   //     LEADERBOARD
   //  ========================================== */

   //  List<QuizAttempt> findAllByOrderByPercentageDesc();
   /* ==========================================
   RECENT QUIZ ATTEMPTS
========================================== */
List<QuizAttempt> findByCompletedAtBetweenOrderByCompletedAtDesc(
        LocalDateTime from,
        LocalDateTime to
);
List<QuizAttempt> findTop10ByOrderByCompletedAtDesc();
void deleteByStudent(Student student);

}