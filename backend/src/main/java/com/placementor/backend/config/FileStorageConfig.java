package com.placementor.backend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class FileStorageConfig {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostConstruct
    public void init() {

        try {

            Files.createDirectories(
                    Paths.get(uploadDir)
                            .resolve("profiles")
            );

            Files.createDirectories(
                    Paths.get(uploadDir)
                            .resolve("resumes")
            );

            System.out.println("--------------------------------");
            System.out.println("Upload folders created successfully");
            System.out.println("Location : " + Paths.get(uploadDir).toAbsolutePath());
            System.out.println("--------------------------------");

        }

        catch (IOException e) {

            throw new RuntimeException(
                    "Could not create upload folders.",
                    e
            );

        }

    }

    public Path getProfileUploadPath() {

        return Paths.get(uploadDir).resolve("profiles");

    }

    public Path getResumeUploadPath() {

        return Paths.get(uploadDir).resolve("resumes");

    }

}