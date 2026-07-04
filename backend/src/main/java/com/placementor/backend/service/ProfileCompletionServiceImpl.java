package com.placementor.backend.service;

import com.placementor.backend.dto.ProfileCompletionResponse;
import com.placementor.backend.entity.Student;
import com.placementor.backend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProfileCompletionServiceImpl
        implements ProfileCompletionService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public ProfileCompletionResponse getProfileCompletion(
            String email
    ) {

        Student student =
                studentRepository
                     .findByUser_Email(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Student not found."
                                )
                        );

        int completed = 0;
        int total = 14;

        List<String> missing = new ArrayList<>();

        if (hasText(student.getFirstName())) {
            completed++;
        } else {
            missing.add("First Name");
        }

        if (hasText(student.getLastName())) {
            completed++;
        } else {
            missing.add("Last Name");
        }

        if (student.getUser() != null
                && hasText(student.getUser().getEmail())) {
            completed++;
        } else {
            missing.add("Email");
        }

        if (hasText(student.getMobile())) {
            completed++;
        } else {
            missing.add("Mobile");
        }

        if (hasText(student.getGender())) {
            completed++;
        } else {
            missing.add("Gender");
        }

        if (student.getDateOfBirth() != null) {
            completed++;
        } else {
            missing.add("Date of Birth");
        }

        if (hasText(student.getAddress())) {
            completed++;
        } else {
            missing.add("Address");
        }

        if (hasText(student.getCity())) {
            completed++;
        } else {
            missing.add("City");
        }

        if (hasText(student.getState())) {
            completed++;
        } else {
            missing.add("State");
        }

        if (hasText(student.getCountry())) {
            completed++;
        } else {
            missing.add("Country");
        }

        if (hasText(student.getCollege())) {
            completed++;
        } else {
            missing.add("College");
        }

        if (hasText(student.getDepartment())) {
            completed++;
        } else {
            missing.add("Department");
        }

        if (hasText(student.getSkills())) {
            completed++;
        } else {
            missing.add("Skills");
        }

        if (hasText(student.getResumeFile())) {
            completed++;
        } else {
            missing.add("Resume");
        }

        int percentage =
                (completed * 100) / total;

        ProfileCompletionResponse response =
                new ProfileCompletionResponse();

        response.setCompletedFields(completed);
        response.setTotalFields(total);
        response.setPercentage(percentage);
        response.setMissing(missing);

        return response;
    }

    private boolean hasText(String value) {

        return value != null
                && !value.trim().isEmpty();

    }

}