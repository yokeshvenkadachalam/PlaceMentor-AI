package com.placementor.backend.dto;

import java.util.List;

public class ProfileCompletionResponse {

    private int percentage;

    private int completedFields;

    private int totalFields;

    private List<String> missing;

    public ProfileCompletionResponse() {
    }

    public int getPercentage() {
        return percentage;
    }

    public void setPercentage(int percentage) {
        this.percentage = percentage;
    }

    public int getCompletedFields() {
        return completedFields;
    }

    public void setCompletedFields(int completedFields) {
        this.completedFields = completedFields;
    }

    public int getTotalFields() {
        return totalFields;
    }

    public void setTotalFields(int totalFields) {
        this.totalFields = totalFields;
    }

    public List<String> getMissing() {
        return missing;
    }

    public void setMissing(List<String> missing) {
        this.missing = missing;
    }

}