package com.placementor.backend.repository;

import com.placementor.backend.entity.DailyChallenge;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailyChallengeRepository
        extends JpaRepository<DailyChallenge, Long> {

    /* ==========================================
       ACTIVE CHALLENGES
    ========================================== */

    List<DailyChallenge> findByActiveTrue();

}