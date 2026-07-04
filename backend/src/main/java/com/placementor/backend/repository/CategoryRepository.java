package com.placementor.backend.repository;

import com.placementor.backend.entity.Category;
import com.placementor.backend.entity.Topic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository
        extends JpaRepository<Category, Long> {

    /* ==========================================
       FIND BY NAME
    ========================================== */

    Optional<Category> findByName(String name);
    

    /* ==========================================
       CHECK NAME EXISTS
    ========================================== */

    boolean existsByName(String name);
    

    /* ==========================================
       GET ACTIVE CATEGORIES
    ========================================== */

    List<Category> findByActiveTrue();

    /* ==========================================
       GET ALL ORDERED BY NAME
    ========================================== */

    List<Category> findAllByOrderByNameAsc();

}