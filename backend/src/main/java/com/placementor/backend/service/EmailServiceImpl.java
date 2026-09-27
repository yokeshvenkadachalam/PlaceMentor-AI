package com.placementor.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class EmailServiceImpl implements EmailService {

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${resend.from.email}")
    private String fromEmail;

    private final RestClient restClient;

    public EmailServiceImpl(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("https://api.resend.com")
                .build();
    }

    /* ==========================================
       SEND EMAIL USING RESEND
    ========================================== */

    @Override
    public void sendEmail(
            String to,
            String subject,
            String body
    ) {

        Map<String, Object> emailRequest = Map.of(
                "from", fromEmail,
                "to", to,
                "subject", subject,
                "text", body
        );

        restClient.post()
                .uri("/emails")
                .header(
                        HttpHeaders.AUTHORIZATION,
                        "Bearer " + resendApiKey
                )
                .contentType(MediaType.APPLICATION_JSON)
                .body(emailRequest)
                .retrieve()
                .toBodilessEntity();
    }
}