package com.placementor.backend.repository;

import com.placementor.backend.entity.Category;
import com.placementor.backend.entity.Topic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository
        extends JpaRepository<Topic, Long> {

    /* ==========================================
       FIND BY CATEGORY
    ========================================== */

    List<Topic> findByCategory(Category category);
    Optional<Topic> findByName(String name);

    /* ==========================================
       FIND ACTIVE TOPICS BY CATEGORY
    ========================================== */

    List<Topic> findByCategoryAndActiveTrue(Category category);

    /* ==========================================
       FIND BY CATEGORY AND NAME
    ========================================== */

    Optional<Topic> findByCategoryAndName(
            Category category,
            String name
    );

    /* ==========================================
       CHECK TOPIC EXISTS
    ========================================== */

    boolean existsByCategoryAndName(
            Category category,
            String name
    );

    /* ==========================================
       GET ALL ACTIVE TOPICS
    ========================================== */

    List<Topic> findByActiveTrue();

    /* ==========================================
       GET ALL TOPICS ORDERED BY NAME
    ========================================== */

    List<Topic> findAllByOrderByNameAsc();

}