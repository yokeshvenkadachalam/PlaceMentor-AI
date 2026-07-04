package com.placementor.backend.repository;

import com.placementor.backend.entity.Category;
import com.placementor.backend.entity.Difficulty;
import com.placementor.backend.entity.Question;
import com.placementor.backend.entity.Topic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository
        extends JpaRepository<Question, Long> {

    /* ==========================================
       GET ALL ACTIVE QUESTIONS
    ========================================== */

    List<Question> findByActiveTrue();

    /* ==========================================
       GET QUESTIONS BY CATEGORY
    ========================================== */

    List<Question> findByCategoryAndActiveTrue(
            Category category
    );

    /* ==========================================
       GET QUESTIONS BY TOPIC
    ========================================== */

    List<Question> findByTopicAndActiveTrue(
            Topic topic
    );

    /* ==========================================
       GET QUESTIONS BY DIFFICULTY
    ========================================== */

    List<Question> findByDifficultyAndActiveTrue(
            Difficulty difficulty
    );

    /* ==========================================
       CATEGORY + TOPIC
    ========================================== */

    List<Question> findByCategoryAndTopicAndActiveTrue(
            Category category,
            Topic topic
    );

    /* ==========================================
       CATEGORY + DIFFICULTY
    ========================================== */

    List<Question> findByCategoryAndDifficultyAndActiveTrue(
            Category category,
            Difficulty difficulty
    );

    /* ==========================================
       TOPIC + DIFFICULTY
    ========================================== */

    List<Question> findByTopicAndDifficultyAndActiveTrue(
            Topic topic,
            Difficulty difficulty
    );
    List<Question> findByCategory(Category category);

    /* ==========================================
   COUNT QUESTIONS BY TOPIC
     ========================================== */

    long countByTopic(Topic topic);

    /* ==========================================
       CATEGORY + TOPIC + DIFFICULTY
    ========================================== */

    List<Question> findByCategoryAndTopicAndDifficultyAndActiveTrue(
            Category category,
            Topic topic,
            Difficulty difficulty
    );

}