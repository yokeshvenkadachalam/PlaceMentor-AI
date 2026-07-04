package com.placementor.backend.service;

import com.placementor.backend.dto.ProfileCompletionResponse;

public interface ProfileCompletionService {

    ProfileCompletionResponse getProfileCompletion(
            String email
    );

}