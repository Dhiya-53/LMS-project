package com.library.library_backend.service;

import com.library.library_backend.config.JwtUtil;

import com.library.library_backend.model.Role;
import com.library.library_backend.model.User;
import com.library.library_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 🔹 LOGIN
    public String login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) {
            return "User not found";
        }

        User user = userOpt.get();

        if (!user.isApproved()) {
            return "User not yet approved by admin";
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return "Invalid credentials";
        }

        // ✅ Generate JWT token
        return jwtUtil.generateToken(user.getUsername(), user.getRole().name());
    }

    // 🔹 REGISTER
    public String register(String username, String password, Role role) {
        if (userRepository.findByUsername(username).isPresent()) {
            return "Username already exists";
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setRole(role);
        newUser.setApproved(false); // requires admin approval before login

        userRepository.save(newUser);
        return "User registered successfully. Await admin approval.";
    }
}

