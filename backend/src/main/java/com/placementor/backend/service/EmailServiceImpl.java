package com.placementor.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class EmailServiceImpl implements EmailService {

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    @Value("${brevo.from.email}")
    private String fromEmail;

    private final RestClient restClient;

    public EmailServiceImpl(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("https://api.brevo.com")
                .build();
    }

    @Override
    public void sendEmail(
            String to,
            String subject,
            String body
    ) {

        Map<String, Object> sender = Map.of(
                "name", "PlaceMentor AI",
                "email", fromEmail
        );

        Map<String, Object> recipient = Map.of(
                "email", to
        );

        Map<String, Object> emailRequest = Map.of(
                "sender", sender,
                "to", List.of(recipient),
                "subject", subject,
                "textContent", body
        );

        restClient.post()
                .uri("/v3/smtp/email")
                .header(
                        "api-key",
                        brevoApiKey
                )
                .header(
                        HttpHeaders.ACCEPT,
                        MediaType.APPLICATION_JSON_VALUE
                )
                .contentType(MediaType.APPLICATION_JSON)
                .body(emailRequest)
                .retrieve()
                .toBodilessEntity();
    }
}