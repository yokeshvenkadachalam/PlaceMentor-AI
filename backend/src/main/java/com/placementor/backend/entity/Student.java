package com.placementor.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ==========================================
       USER RELATION
    ========================================== */

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    private User user;

    /* ==========================================
       PERSONAL DETAILS
    ========================================== */

    @Column(length = 100)
    private String firstName;

    @Column(length = 100)
    private String lastName;

    @Column(length = 15)
    private String mobile;

    @Column(length = 10)
    private String gender;

    private LocalDate dateOfBirth;

    /* ==========================================
       ADDRESS
    ========================================== */

    @Column(length = 255)
    private String address;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(length = 100)
    private String country;

    /* ==========================================
       EDUCATION
    ========================================== */

    @Column(length = 200)
    private String college;

    @Column(length = 150)
    private String department;

    @Column(length = 50)
    private String yearOfStudy;

    /* ==========================================
       PROFILE
    ========================================== */

    @Column(length = 2000)
    private String about;

    @Column(length = 1000)
    private String skills;
    /* ==========================================
   GAMIFICATION
    ========================================== */

   @Column(nullable = false)
   private int xp = 0;

   @Column(nullable = false)
   private int level = 1;

   @Column(nullable = false)
   private int totalXpEarned = 0;

   @Column(nullable = false)
   private int currentStreak = 0;

   @Column(nullable = false)
   private int longestStreak = 0;
   /* ==========================================
   LAST PRACTICE DATE
   ========================================== */

    @Column
    private LocalDate lastPracticeDate;

    private String profileImage;

    private String resumeFile;

    /* ==========================================
       TIMESTAMPS
    ========================================== */

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    public Student() {
    }

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    /* ==========================================
       GETTERS & SETTERS
    ========================================== */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getYearOfStudy() {
        return yearOfStudy;
    }

    public void setYearOfStudy(String yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getResumeFile() {
        return resumeFile;
    }

    public void setResumeFile(String resumeFile) {
        this.resumeFile = resumeFile;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    /* ==========================================
   GAMIFICATION
========================================== */

public int getXp() {
    return xp;
}

public void setXp(int xp) {
    this.xp = xp;
}

public int getLevel() {
    return level;
}

public void setLevel(int level) {
    this.level = level;
}

public int getTotalXpEarned() {
    return totalXpEarned;
}

public void setTotalXpEarned(int totalXpEarned) {
    this.totalXpEarned = totalXpEarned;
}

public int getCurrentStreak() {
    return currentStreak;
}

public void setCurrentStreak(int currentStreak) {
    this.currentStreak = currentStreak;
}

public int getLongestStreak() {
    return longestStreak;
}

public void setLongestStreak(int longestStreak) {
    this.longestStreak = longestStreak;
}
public LocalDate getLastPracticeDate() {
    return lastPracticeDate;
}

public void setLastPracticeDate(LocalDate lastPracticeDate) {
    this.lastPracticeDate = lastPracticeDate;
}
}