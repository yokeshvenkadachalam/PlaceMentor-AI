package com.placementor.backend.dto;

import java.util.ArrayList;
import java.util.List;

public class StudentManagementResponse {

    /* ==========================================
       SUMMARY
    ========================================== */

    private int totalStudents;

    private int activeStudents;

    private int inactiveStudents;

    /* ==========================================
       STUDENT LIST
    ========================================== */

    private List<StudentCardResponse> students =
            new ArrayList<>();

    /* ==========================================
       CONSTRUCTOR
    ========================================== */

    public StudentManagementResponse() {
    }

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public int getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(int totalStudents) {
        this.totalStudents = totalStudents;
    }

    public int getActiveStudents() {
        return activeStudents;
    }

    public void setActiveStudents(int activeStudents) {
        this.activeStudents = activeStudents;
    }

    public int getInactiveStudents() {
        return inactiveStudents;
    }

    public void setInactiveStudents(int inactiveStudents) {
        this.inactiveStudents = inactiveStudents;
    }

    public List<StudentCardResponse> getStudents() {
        return students;
    }

    public void setStudents(List<StudentCardResponse> students) {
        this.students = students;
    }

}