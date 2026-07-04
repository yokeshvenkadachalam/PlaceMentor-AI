package com.placementor.backend.service;

import com.placementor.backend.dto.SettingsRequest;
import com.placementor.backend.dto.SettingsResponse;
import com.placementor.backend.entity.Student;
import com.placementor.backend.entity.StudentSettings;
import com.placementor.backend.entity.User;
import com.placementor.backend.repository.StudentRepository;
import com.placementor.backend.repository.StudentSettingsRepository;
import com.placementor.backend.repository.UserRepository;
import com.placementor.backend.repository.UserAchievementRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;

import com.placementor.backend.repository.NotificationRepository;
import com.placementor.backend.repository.QuizAnswerRepository;
import com.placementor.backend.repository.QuizAttemptRepository;
import com.placementor.backend.repository.StudentDailyChallengeRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import com.placementor.backend.entity.QuizAttempt;

@Service
public class SettingsServiceImpl implements SettingsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentSettingsRepository settingsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserAchievementRepository userAchievementRepository;
    @Autowired
    private StudentDailyChallengeRepository studentDailyChallengeRepository;
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private QuizAnswerRepository quizAnswerRepository;
    /* ==========================================
       GET SETTINGS
    ========================================== */

    @Override
    public SettingsResponse getSettings(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        Student student = studentRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Student not found."));

        StudentSettings settings =
                settingsRepository.findByStudent(student)
                        .orElseGet(() -> {

                            StudentSettings s = new StudentSettings();

                            s.setStudent(student);

                            s.setTheme("light");

                            return settingsRepository.save(s);

                        });

        SettingsResponse response = new SettingsResponse();

        response.setFullName(
        (student.getFirstName() + " " + student.getLastName()).trim()
);

        response.setStudentId(user.getUserId());

        response.setEmail(user.getEmail());

        response.setTheme(settings.getTheme());

        return response;

    }
    

    /* ==========================================
       UPDATE SETTINGS
    ========================================== */

    @Override
    public SettingsResponse updateSettings(
            String email,
            SettingsRequest request
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        Student student = studentRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Student not found."));

        StudentSettings settings =
                settingsRepository.findByStudent(student)
                        .orElseGet(() -> {

                            StudentSettings s = new StudentSettings();

                            s.setStudent(student);

                            s.setTheme("light");

                            return settingsRepository.save(s);

                        });

        /* ---------- Full Name ---------- */

        if (request.getFullName() == null ||
    request.getFullName().isBlank()) {

    throw new RuntimeException("Full name is required.");

}

String[] names = request.getFullName()
        .trim()
        .split("\\s+", 2);

        student.setFirstName(names[0]);

        if (names.length > 1) {

            student.setLastName(names[1]);

        } else {

            student.setLastName("");

        }

        studentRepository.save(student);

        /* ---------- Email ---------- */

       /* ---------- User ---------- */

user.setFullName(request.getFullName());

user.setEmail(request.getEmail());

if (request.getPassword() != null &&
    !request.getPassword().isBlank()) {

    user.setPassword(
        passwordEncoder.encode(request.getPassword())
    );
}

userRepository.save(user);

        /* ---------- Theme ---------- */

        settings.setTheme(request.getTheme());

        settingsRepository.save(settings);

        return getSettings(user.getEmail());

    }

    /* ==========================================
       DELETE ACCOUNT
    ========================================== */

    @Override
    @Transactional
public void deleteAccount(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found."));

    Student student = studentRepository.findByUser(user)
            .orElseThrow(() ->
                    new RuntimeException("Student not found."));

    // Student Settings
    settingsRepository.findByStudent(student)
            .ifPresent(settingsRepository::delete);

    // Achievements
    userAchievementRepository.deleteByStudent(student);

    // Daily Challenges
    studentDailyChallengeRepository.deleteByStudent(student);

    // Notifications
    notificationRepository.deleteByStudent(student);

    // Quiz Answers -> Quiz Attempts
    List<QuizAttempt> attempts =
            quizAttemptRepository.findByStudentOrderByCompletedAtDesc(student);

    for (QuizAttempt attempt : attempts) {
        quizAnswerRepository.deleteByAttempt(attempt);
    }

    // Quiz Attempts
    quizAttemptRepository.deleteByStudent(student);

    // Student
    studentRepository.delete(student);

    // User
    userRepository.delete(user);
}

}