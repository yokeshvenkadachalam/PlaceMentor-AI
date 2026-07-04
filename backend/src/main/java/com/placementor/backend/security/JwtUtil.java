package com.placementor.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    /* ==========================================
       SECRET KEY
    ========================================== */

    private static final String SECRET_KEY =
            "PlaceMentorAIBackendSuperSecretKeyForJWTAuthentication2026";

    private final SecretKey key =
            Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes(StandardCharsets.UTF_8)
            );

    /* ==========================================
       TOKEN EXPIRATION
    ========================================== */

    private static final long EXPIRATION_TIME =
            1000 * 60 * 60 * 24; // 24 Hours

    /* ==========================================
       GENERATE TOKEN
    ========================================== */

    public String generateToken(String email){

        return Jwts.builder()

                .subject(email)

                .issuedAt(new Date())

                .expiration(

                        new Date(

                                System.currentTimeMillis()

                                        + EXPIRATION_TIME

                        )

                )

                .signWith(key)

                .compact();

    }

    /* ==========================================
       EXTRACT EMAIL
    ========================================== */

    public String extractEmail(String token){

        return getClaims(token).getSubject();

    }

    /* ==========================================
       EXTRACT EXPIRATION
    ========================================== */

    public Date extractExpiration(String token){

        return getClaims(token).getExpiration();

    }

    /* ==========================================
       TOKEN VALID?
    ========================================== */

    public boolean isTokenValid(String token){

        try{

            Claims claims = getClaims(token);

            return !claims.getExpiration().before(new Date());

        }

        catch (JwtException | IllegalArgumentException e){

            return false;

        }

    }

    /* ==========================================
       GET CLAIMS
    ========================================== */

    private Claims getClaims(String token){

        return Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload();

    }

}