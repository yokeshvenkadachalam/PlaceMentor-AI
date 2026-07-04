package com.placementor.backend.service;

import com.placementor.backend.config.FileStorageConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class UploadService {

    @Autowired
    private FileStorageConfig fileStorageConfig;

    /* ==========================================
       UPLOAD PROFILE IMAGE
    ========================================== */

    public String uploadProfileImage(MultipartFile file) {

        validateImage(file);

        String filename = generateFileName(file);

        Path destination =
                fileStorageConfig
                        .getProfileUploadPath()
                        .resolve(filename);

        try {

            Files.copy(

                    file.getInputStream(),

                    destination,

                    StandardCopyOption.REPLACE_EXISTING

            );

            return filename;

        }

        catch (IOException e) {

            throw new RuntimeException(

                    "Failed to upload profile image.",

                    e

            );

        }

    }

    /* ==========================================
       UPLOAD RESUME
    ========================================== */

    public String uploadResume(MultipartFile file) {

        validateResume(file);

        String filename = generateFileName(file);

        Path destination =
                fileStorageConfig
                        .getResumeUploadPath()
                        .resolve(filename);

        try {

            Files.copy(

                    file.getInputStream(),

                    destination,

                    StandardCopyOption.REPLACE_EXISTING

            );

            return filename;

        }

        catch (IOException e) {

            throw new RuntimeException(

                    "Failed to upload resume.",

                    e

            );

        }

    }

    /* ==========================================
       GENERATE UNIQUE FILE NAME
    ========================================== */

    private String generateFileName(MultipartFile file) {

        String extension =

                StringUtils.getFilenameExtension(

                        file.getOriginalFilename()

                );

        return UUID.randomUUID()

                + "."

                + extension;

    }

    /* ==========================================
       IMAGE VALIDATION
    ========================================== */

    private void validateImage(MultipartFile file) {

        if (file == null || file.isEmpty()) {

            throw new RuntimeException(

                    "Please select an image."

            );

        }

        String type = file.getContentType();

        if (type == null ||

                !(

                        type.equals("image/jpeg")

                                ||

                                type.equals("image/png")

                                ||

                                type.equals("image/jpg")

                )

        ) {

            throw new RuntimeException(

                    "Only JPG and PNG images are allowed."

            );

        }

    }

    /* ==========================================
       RESUME VALIDATION
    ========================================== */

    private void validateResume(MultipartFile file) {

        if (file == null || file.isEmpty()) {

            throw new RuntimeException(

                    "Please select a resume."

            );

        }

        String type = file.getContentType();

        if (type == null ||

                !(

                        type.equals("application/pdf")

                                ||

                                type.equals(

                                "application/msword"

                        )

                                ||

                                type.equals(

                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

                        )

                )

        ) {

            throw new RuntimeException(

                    "Only PDF, DOC and DOCX files are allowed."

            );

        }

    }

}