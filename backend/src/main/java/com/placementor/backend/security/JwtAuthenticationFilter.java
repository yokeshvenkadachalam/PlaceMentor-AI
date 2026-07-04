package com.placementor.backend.security;

import com.placementor.backend.entity.User;
import com.placementor.backend.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        System.out.println("\n================ JWT FILTER ================");
        System.out.println("Request : " + request.getMethod() + " " + request.getRequestURI());

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            System.out.println("No JWT Token");
            System.out.println("===========================================");

            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        if (!jwtUtil.isTokenValid(token)) {

            System.out.println("Invalid JWT Token");
            System.out.println("===========================================");

            filterChain.doFilter(request, response);
            return;
        }

        String email = jwtUtil.extractEmail(token);

        System.out.println("Email : " + email);

        Optional<User> optionalUser = userService.getUserByEmail(email);

        if (optionalUser.isEmpty()) {

            System.out.println("User Not Found");
            System.out.println("===========================================");

            filterChain.doFilter(request, response);
            return;
        }

        User user = optionalUser.get();

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        List.of(
                                new SimpleGrantedAuthority(
                                        "ROLE_" + user.getRole().toUpperCase()
                                )
                        )
                );

        authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        System.out.println("Authentication Success");
        System.out.println("===========================================");

        filterChain.doFilter(request, response);
    }
}