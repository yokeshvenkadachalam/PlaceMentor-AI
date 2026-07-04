package com.placementor.backend.service;

import com.placementor.backend.dto.ForgotPasswordRequest;
import com.placementor.backend.dto.ResetPasswordRequest;
import com.placementor.backend.dto.VerifyOtpRequest;
import com.placementor.backend.entity.PasswordResetOtp;
import com.placementor.backend.entity.User;
import com.placementor.backend.repository.PasswordResetOtpRepository;
import com.placementor.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@Transactional
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetOtpRepository otpRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    /* ==========================================
       SEND OTP
    ========================================== */

    @Override
    public void sendOtp(ForgotPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Email not registered."));

        otpRepository.deleteByEmail(user.getEmail());

        String otp = String.format("%06d",
                new Random().nextInt(1000000));

        PasswordResetOtp resetOtp = new PasswordResetOtp();

        resetOtp.setEmail(user.getEmail());
        resetOtp.setOtp(otp);
        resetOtp.setExpiresAt(
    LocalDateTime.now().plusMinutes(5)
     );

        otpRepository.save(resetOtp);

        String subject = "PlaceMentor AI Password Reset OTP";

        String body =
                "Hello " + user.getFullName() + ",\n\n" +
                "Your OTP for resetting your password is:\n\n" +
                otp +
                "\n\nThis OTP is valid for 5 minutes." +
                "\n\nIf you did not request this, please ignore this email." +
                "\n\nRegards,\nPlaceMentor AI";

        emailService.sendEmail(
                user.getEmail(),
                subject,
                body
        );
    }

    /* ==========================================
       VERIFY OTP
    ========================================== */

    @Override
    public void verifyOtp(VerifyOtpRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        PasswordResetOtp otp =
        otpRepository
                .findTopByEmailOrderByCreatedAtDesc(user.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("OTP not found."));

        if (!otp.getOtp().equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP.");
        }

        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP has expired.");
        }
    }

    /* ==========================================
       RESET PASSWORD
    ========================================== */

    @Override
    public void resetPassword(ResetPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        PasswordResetOtp otp =
        otpRepository
                .findTopByEmailOrderByCreatedAtDesc(user.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("OTP not found."));

        if (!otp.getOtp().equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP.");
        }

        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP has expired.");
        }

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);

        otpRepository.delete(otp);
    }

}