package com.placementor.backend.service;

import com.placementor.backend.dto.StudentRegistrationRequest;
import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.User;
import com.placementor.backend.repository.StudentRepository;
import com.placementor.backend.repository.UserRepository;
import com.placementor.backend.dto.StudentProfileResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    /* ==========================================
       CREATE PROFILE
    ========================================== */

    public Student createProfile(String userId, Student student) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found.")
                );

        if (studentRepository.existsByUser(user)) {
            throw new RuntimeException("Student profile already exists.");
        }

        student.setUser(user);

        return studentRepository.save(student);
    }

    /* ==========================================
       CREATE STUDENT DURING REGISTRATION
    ========================================== */

    public Student createStudent(User user, StudentRegistrationRequest request) {

        Student student = new Student();

        student.setUser(user);

        String[] names = request.getFullName().trim().split("\\s+", 2);

        student.setFirstName(names[0]);

        if (names.length > 1) {
            student.setLastName(names[1]);
        } else {
            student.setLastName("");
        }

        student.setCollege(request.getCollege());
        student.setDepartment(request.getDepartment());
        student.setYearOfStudy(request.getYearOfStudy());
        student.setMobile(request.getMobile());

        return studentRepository.save(student);
    }

    /* ==========================================
       GET PROFILE BY USER ID
    ========================================== */

    public Optional<Student> getProfile(String userId) {

        return studentRepository.findByUser_UserId(userId);

    }

    /* ==========================================
       GET PROFILE BY EMAIL (JWT)
    ========================================== */

    public Optional<Student> getProfileByEmail(String email) {

        return studentRepository.findByUser_Email(email);

    }

    /* ==========================================
       UPDATE PROFILE
    ========================================== */

    public Student updateProfile(String userId, Student updatedStudent) {

        Student student = studentRepository.findByUser_UserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("Student profile not found.")
                );

        copyStudentFields(student, updatedStudent);

        return studentRepository.save(student);
    }

    /* ==========================================
       UPDATE PROFILE BY EMAIL (JWT)
    ========================================== */

    public Student updateProfileByEmail(String email, Student updatedStudent) {

        Student student = studentRepository.findByUser_Email(email)
                .orElseThrow(() ->
                        new RuntimeException("Student profile not found.")
                );

        copyStudentFields(student, updatedStudent);

        return studentRepository.save(student);
    }

    /* ==========================================
       COPY FIELDS
    ========================================== */

    private void copyStudentFields(Student student, Student updatedStudent) {

        student.setFirstName(updatedStudent.getFirstName());
        student.setLastName(updatedStudent.getLastName());
        student.setMobile(updatedStudent.getMobile());
        student.setGender(updatedStudent.getGender());
        student.setDateOfBirth(updatedStudent.getDateOfBirth());

        student.setAddress(updatedStudent.getAddress());
        student.setCity(updatedStudent.getCity());
        student.setState(updatedStudent.getState());
        student.setCountry(updatedStudent.getCountry());

        student.setCollege(updatedStudent.getCollege());
        student.setDepartment(updatedStudent.getDepartment());
        student.setYearOfStudy(updatedStudent.getYearOfStudy());

        student.setAbout(updatedStudent.getAbout());
        student.setSkills(updatedStudent.getSkills());

        student.setProfileImage(updatedStudent.getProfileImage());
        student.setResumeFile(updatedStudent.getResumeFile());
    }

    /* ==========================================
       GET ALL STUDENTS
    ========================================== */

    public List<Student> getAllStudents() {

        return studentRepository.findAll();

    }

    /* ==========================================
       DELETE PROFILE
    ========================================== */

    public void deleteProfile(String userId) {

        Student student = studentRepository.findByUser_UserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("Student profile not found.")
                );

        studentRepository.delete(student);
    }
    /* ==========================================
   GET PROFILE RESPONSE (JWT)
========================================== */

public StudentProfileResponse getProfileResponseByEmail(String email) {

    Student student = studentRepository.findByUser_Email(email)
            .orElseThrow(() ->
                    new RuntimeException("Student profile not found.")
            );

    StudentProfileResponse response = new StudentProfileResponse();

    // ================= USER =================

    response.setStudentId(student.getUser().getUserId());
    response.setFullName(student.getUser().getFullName());
    response.setEmail(student.getUser().getEmail());
    response.setRole(student.getUser().getRole());

    // ================= STUDENT =================

    response.setId(student.getId());

    response.setFirstName(student.getFirstName());
    response.setLastName(student.getLastName());

    response.setMobile(student.getMobile());
    response.setGender(student.getGender());
    response.setDateOfBirth(student.getDateOfBirth());

    response.setAddress(student.getAddress());
    response.setCity(student.getCity());
    response.setState(student.getState());
    response.setCountry(student.getCountry());

    response.setCollege(student.getCollege());
    response.setDepartment(student.getDepartment());
    response.setYearOfStudy(student.getYearOfStudy());

    response.setAbout(student.getAbout());
    response.setSkills(student.getSkills());

    response.setProfileImage(student.getProfileImage());
    response.setResumeFile(student.getResumeFile());

    response.setCreatedAt(student.getCreatedAt());
    response.setUpdatedAt(student.getUpdatedAt());

    return response;
    
}
/* ==========================================
   UPDATE PROFILE IMAGE
========================================== */

public void updateProfileImage(String email, String filename) {

    Student student = studentRepository.findByUser_Email(email)
            .orElseThrow(() ->
                    new RuntimeException("Student profile not found.")
            );

    student.setProfileImage(filename);

    studentRepository.save(student);

}

/* ==========================================
   UPDATE RESUME
========================================== */

public void updateResume(String email, String filename) {

    Student student = studentRepository.findByUser_Email(email)
            .orElseThrow(() ->
                    new RuntimeException("Student profile not found.")
            );

    student.setResumeFile(filename);

    studentRepository.save(student);

}
}