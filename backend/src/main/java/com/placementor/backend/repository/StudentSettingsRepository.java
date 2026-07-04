package com.placementor.backend.repository;

import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.StudentSettings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentSettingsRepository
        extends JpaRepository<StudentSettings, Long> {

    Optional<StudentSettings> findByStudent(Student student);

    boolean existsByStudent(Student student);
    void deleteByStudent(Student student);


}