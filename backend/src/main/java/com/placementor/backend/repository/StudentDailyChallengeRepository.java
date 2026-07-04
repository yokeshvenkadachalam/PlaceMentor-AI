package com.placementor.backend.repository;

import com.placementor.backend.entity.DailyChallenge;
import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.StudentDailyChallenge;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentDailyChallengeRepository
        extends JpaRepository<StudentDailyChallenge, Long> {

    List<StudentDailyChallenge> findByStudentAndChallengeDate(
            Student student,
            LocalDate challengeDate
    );

    Optional<StudentDailyChallenge> findByStudentAndChallengeAndChallengeDate(
            Student student,
            DailyChallenge challenge,
            LocalDate challengeDate
    );

    List<StudentDailyChallenge> findByStudentAndCompletedTrue(
            Student student
    );

    List<StudentDailyChallenge> findByStudentAndChallengeDateAndCompletedTrue(
            Student student,
            LocalDate challengeDate
    );

    // NEW
    void deleteByStudent(Student student);

}