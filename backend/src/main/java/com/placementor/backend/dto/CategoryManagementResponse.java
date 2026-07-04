package com.placementor.backend.dto;

import java.util.List;

public class CategoryManagementResponse {

    /* ==========================================
       SUMMARY
    ========================================== */

    private int totalCategories;

    private int activeCategories;

    private int inactiveCategories;

    /* ==========================================
       CATEGORY LIST
    ========================================== */

    private List<CategoryCardResponse> categories;

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public int getTotalCategories() {
        return totalCategories;
    }

    public void setTotalCategories(int totalCategories) {
        this.totalCategories = totalCategories;
    }

    public int getActiveCategories() {
        return activeCategories;
    }

    public void setActiveCategories(int activeCategories) {
        this.activeCategories = activeCategories;
    }

    public int getInactiveCategories() {
        return inactiveCategories;
    }

    public void setInactiveCategories(int inactiveCategories) {
        this.inactiveCategories = inactiveCategories;
    }

    public List<CategoryCardResponse> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryCardResponse> categories) {
        this.categories = categories;
    }

}