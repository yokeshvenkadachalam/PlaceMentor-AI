package com.placementor.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuizHistoryResponse {

    private Long attemptId;

    private String category;

    private String topic;

    private String difficulty;

    private Integer score;

    private Integer totalMarks;

    private Double percentage;

    private Integer timeTaken;

    private Boolean passed;

    private LocalDateTime completedAt;

}