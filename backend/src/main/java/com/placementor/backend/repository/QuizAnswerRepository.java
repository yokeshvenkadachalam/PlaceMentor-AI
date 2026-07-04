package com.placementor.backend.repository;

import com.placementor.backend.entity.Question;
import com.placementor.backend.entity.QuizAnswer;
import com.placementor.backend.entity.QuizAttempt;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizAnswerRepository
        extends JpaRepository<QuizAnswer, Long> {

    /* ==========================================
       GET ALL ANSWERS OF AN ATTEMPT
    ========================================== */

    List<QuizAnswer> findByAttempt(
            QuizAttempt attempt
    );

    /* ==========================================
       GET ANSWERS ORDERED
    ========================================== */

    List<QuizAnswer> findByAttemptOrderByIdAsc(
            QuizAttempt attempt
    );

    /* ==========================================
       FIND ANSWER OF A QUESTION
    ========================================== */

    Optional<QuizAnswer> findByAttemptAndQuestion(
            QuizAttempt attempt,
            Question question
    );

    /* ==========================================
       GET CORRECT ANSWERS
    ========================================== */

    List<QuizAnswer> findByAttemptAndIsCorrectTrue(
            QuizAttempt attempt
    );

    /* ==========================================
       GET WRONG ANSWERS
    ========================================== */

    List<QuizAnswer> findByAttemptAndIsCorrectFalse(
            QuizAttempt attempt
    );

    /* ==========================================
       DELETE ALL ANSWERS OF AN ATTEMPT
    ========================================== */

    void deleteByAttempt(
            QuizAttempt attempt
    );

}