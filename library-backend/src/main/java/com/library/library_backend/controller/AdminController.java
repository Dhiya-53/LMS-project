package com.library.library_backend.controller;

import com.library.library_backend.model.User;
import com.library.library_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5174")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    // 🔹 Add a new user
    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        try {
            // check if username already exists
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Username already exists!");
            }

            // encode password
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // new users must be approved manually by admin
            user.setApproved(false);
            userRepository.save(user);

            return ResponseEntity.ok("User added successfully!");
        } catch (Exception e) {
            e.printStackTrace(); // shows real error in backend console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    // 🔹 Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 🔹 Approve a user
    @PutMapping("/approve/{id}")
    public String approveUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setApproved(true);
        userRepository.save(user);
        return "User " + user.getUsername() + " approved successfully.";
    }

    // 🔹 Delete a user
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return "User not found";
        }
        userRepository.deleteById(id);
        return "User deleted successfully.";
    }
}

