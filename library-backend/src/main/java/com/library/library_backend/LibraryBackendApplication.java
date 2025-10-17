package com.library.library_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class LibraryBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryBackendApplication.class, args);

        // 🔹 Generate a bcrypt hash for testing (optional)
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hash = encoder.encode("admin123");
        System.out.println("Generated hash for admin123: " + hash);
    }
}
