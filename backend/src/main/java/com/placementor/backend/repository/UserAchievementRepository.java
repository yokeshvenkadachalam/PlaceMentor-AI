package com.placementor.backend.repository;

import com.placementor.backend.entity.Achievement;
import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.UserAchievement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAchievementRepository
        extends JpaRepository<UserAchievement, Long> {

    List<UserAchievement> findByStudentOrderByUnlockedAtDesc(
            Student student
    );

    boolean existsByStudentAndAchievement(
            Student student,
            Achievement achievement
    );

    Optional<UserAchievement> findByStudentAndAchievement(
            Student student,
            Achievement achievement
    );

    // NEW
    void deleteByStudent(Student student);

}