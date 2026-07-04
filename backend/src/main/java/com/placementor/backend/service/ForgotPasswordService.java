package com.placementor.backend.service;

import com.placementor.backend.dto.ForgotPasswordRequest;
import com.placementor.backend.dto.ResetPasswordRequest;
import com.placementor.backend.dto.VerifyOtpRequest;

public interface ForgotPasswordService {

    void sendOtp(ForgotPasswordRequest request);

    void verifyOtp(VerifyOtpRequest request);

    void resetPassword(ResetPasswordRequest request);

}