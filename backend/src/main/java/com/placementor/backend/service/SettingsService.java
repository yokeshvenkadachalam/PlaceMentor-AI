package com.placementor.backend.service;

import com.placementor.backend.dto.SettingsRequest;
import com.placementor.backend.dto.SettingsResponse;

public interface SettingsService {

    SettingsResponse getSettings(String email);

    SettingsResponse updateSettings(
            String email,
            SettingsRequest request
    );

    void deleteAccount(String email);

}