
package com.library.library_backend.controller;

import com.library.library_backend.model.User;


import com.library.library_backend.repository.UserRepository;
import com.library.library_backend.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5174")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 🔹 Login endpoint
    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {
        User user = userRepository.findByUsername(loginUser.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isApproved()) {
            return "User not yet approved by admin";
        }

        if (passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
            return jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        } else {
            return "Invalid credentials";
        }
    }

    // 🔹 Register endpoint
    @PostMapping("/register")
    public String register(@RequestBody User newUser) {
        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return "Username already exists";
        }

        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setApproved(false); // requires admin approval
        userRepository.save(newUser);

        return "User registered successfully. Await admin approval.";
    }
}