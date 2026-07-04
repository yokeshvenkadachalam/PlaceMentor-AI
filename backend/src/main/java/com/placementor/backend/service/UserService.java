package com.placementor.backend.service;

import com.placementor.backend.entity.User;
import com.placementor.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /* ==========================================
       REGISTER USER
    ========================================== */

    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {

            throw new RuntimeException(
                    "Email already registered."
            );

        }

        user.setPassword(

                passwordEncoder.encode(

                        user.getPassword()

                )

        );

        user.setUserId(

                generateUserId(

                        user.getRole()

                )

        );

        return userRepository.save(user);

    }

    /* ==========================================
       LOGIN
    ========================================== */

    public Optional<User> login(

            String email,

            String password

    ) {

        Optional<User> user =

                userRepository.findByEmail(email);

        if (

                user.isPresent()

                        &&

                        passwordEncoder.matches(

                                password,

                                user.get().getPassword()

                        )

        ) {

            return user;

        }

        return Optional.empty();

    }

    /* ==========================================
       FIND USER
    ========================================== */

    public Optional<User> getUserById(Long id) {

        return userRepository.findById(id);

    }

    public Optional<User> getUserByEmail(String email) {

        return userRepository.findByEmail(email);

    }

    public Optional<User> getUserByUserId(String userId) {

        return userRepository.findByUserId(userId);

    }

    /* ==========================================
       UPDATE USER
    ========================================== */

    public User updateUser(User user) {

        return userRepository.save(user);

    }

    /* ==========================================
       DELETE USER
    ========================================== */

    public void deleteUser(Long id) {

        userRepository.deleteById(id);

    }

    /* ==========================================
       GENERATE USER ID
    ========================================== */

   public String generateUserId(String role) {

        String prefix;

        switch (role.toUpperCase()) {

            case "ADMIN":
                prefix = "ADM";
                break;

            case "STUDENT":
                prefix = "STD";
                break;

            case "TRAINER":
                prefix = "TRN";
                break;

            case "RECRUITER":
                prefix = "REC";
                break;

            default:
                prefix = "USR";

        }

        Optional<User> latestUser =

                userRepository
                        .findTopByUserIdStartingWithOrderByUserIdDesc(prefix);

        int nextNumber = 1;

        if (latestUser.isPresent()) {

            String lastId = latestUser.get().getUserId();

            String number =

                    lastId.substring(prefix.length());

            nextNumber =

                    Integer.parseInt(number) + 1;

        }

        return String.format(

                "%s%05d",

                prefix,

                nextNumber

        );

    }

}