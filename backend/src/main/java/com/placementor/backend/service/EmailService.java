package com.placementor.backend.service;

public interface EmailService {

    /* ==========================================
       SEND EMAIL
    ========================================== */

    void sendEmail(

            String to,

            String subject,

            String body

    );

}