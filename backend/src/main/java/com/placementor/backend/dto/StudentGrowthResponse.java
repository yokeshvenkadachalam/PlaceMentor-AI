package com.placementor.backend.dto;

public class StudentGrowthResponse {

    private String month;
    private long students;

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public long getStudents() {
        return students;
    }

    public void setStudents(long students) {
        this.students = students;
    }

}