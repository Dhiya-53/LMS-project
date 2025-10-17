package com.library.library_backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // ✅ A secure, proper secret key (must be at least 32 bytes for HS256)
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor("this_is_a_secure_secret_key_for_library_app_2025".getBytes());

    // ✅ Generate JWT Token
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 40)) // 40 hours
 // 10 hours
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ Extract Username
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // ✅ Extract Role
    public String extractRole(String token) {
        return (String) extractAllClaims(token).get("role");
    }

    // ✅ Validate Token
    public boolean validateToken(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // ✅ Correct parser syntax for JJWT 0.11.x
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
