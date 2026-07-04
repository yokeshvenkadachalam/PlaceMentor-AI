package com.placementor.backend.service;

import com.placementor.backend.entity.Student;
import com.placementor.backend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class StreakServiceImpl
        implements StreakService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public void updateStreak(Student student) {

        LocalDate today = LocalDate.now();

        LocalDate lastPractice =
                student.getLastPracticeDate();

        if (lastPractice == null) {

            student.setCurrentStreak(1);

            student.setLongestStreak(1);

        }

        else if (lastPractice.equals(today)) {

            // Already practiced today
            return;

        }

        else if (lastPractice.equals(today.minusDays(1))) {

            student.setCurrentStreak(

                    student.getCurrentStreak() + 1

            );

        }

        else {

            student.setCurrentStreak(1);

        }

        if (student.getCurrentStreak() >

                student.getLongestStreak()) {

            student.setLongestStreak(

                    student.getCurrentStreak()

            );

        }

        student.setLastPracticeDate(today);

        studentRepository.save(student);

    }

}