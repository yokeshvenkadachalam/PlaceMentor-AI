package com.placementor.backend.service;

import com.placementor.backend.dto.LevelResponse;
import com.placementor.backend.entity.Student;
import com.placementor.backend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LevelServiceImpl
        implements LevelService {

    @Autowired
    private StudentRepository studentRepository;

    /* ==========================================
       LEVEL FORMULA
    ========================================== */

    private int getRequiredXP(int level) {

        return level * 150;

    }

    /* ==========================================
       ADD XP
    ========================================== */

    @Override
    public void addXP(
            Student student,
            int xp
    ) {

        student.setXp(
                student.getXp() + xp
        );

        student.setTotalXpEarned(
                student.getTotalXpEarned() + xp
        );

        while (student.getXp() >= getRequiredXP(student.getLevel())) {

            student.setXp(

                    student.getXp()
                            - getRequiredXP(student.getLevel())

            );

            student.setLevel(
                    student.getLevel() + 1
            );

        }

        studentRepository.save(student);

    }

    /* ==========================================
       GET LEVEL
    ========================================== */

    @Override
    public LevelResponse getLevel(
            String email
    ) {

        Student student =
                studentRepository
                        .findByUser_Email(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student not found."
                                )
                        );

        LevelResponse response =
                new LevelResponse();

        response.setXp(
                student.getXp()
        );

        response.setLevel(
                student.getLevel()
        );

        response.setCurrentLevelXP(
                0
        );

        response.setNextLevelXP(
                getRequiredXP(
                        student.getLevel()
                )
        );

        response.setRemainingXP(

                getRequiredXP(student.getLevel())
                        - student.getXp()

        );

        int progress =

                (int) (

                        (student.getXp() * 100.0)

                                /

                                getRequiredXP(student.getLevel())

                );

        response.setProgress(progress);

        return response;

    }

}