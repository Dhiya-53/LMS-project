package com.library.library_backend.controller;

import com.library.library_backend.model.*;
import com.library.library_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping("/issue")
@CrossOrigin(origins = "http://localhost:5174")
public class IssueController {

    @Autowired
    private IssueRecordRepository issueRecordRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;

    // 📘 Issue a book
    @PostMapping("/add")
    public String issueBook(@RequestParam Long userId, @RequestParam Long bookId) {
        User user = userRepository.findById(userId).orElseThrow();
        Book book = bookRepository.findById(bookId).orElseThrow();

        if (book.getAvailableCopies() <= 0) {
            return "❌ No copies available";
        }

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        LocalDate issueDate = LocalDate.now();
        LocalDate dueDate = issueDate.plusDays(7); // 7-day limit

        IssueRecord record = new IssueRecord(user, book, issueDate, dueDate);
        issueRecordRepository.save(record);

        return "✅ Book issued successfully. Due date: " + dueDate;
    }

    // 🔁 Return book and calculate fine
    @PutMapping("/return/{recordId}")
    public String returnBook(@PathVariable Long recordId) {
        IssueRecord record = issueRecordRepository.findById(recordId).orElseThrow();
        if (record.isReturned()) {
            return "❌ Already returned";
        }

        record.setReturned(true);
        record.setReturnDate(LocalDate.now());

        long lateDays = ChronoUnit.DAYS.between(record.getDueDate(), record.getReturnDate());
        double fine = lateDays > 0 ? lateDays * 5.0 : 0.0; // ₹5 per day fine
        record.setFine(fine);

        Book book = record.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);
        issueRecordRepository.save(record);

        return fine > 0
                ? "✅ Returned with fine ₹" + fine
                : "✅ Book returned on time";
    }

    // 📋 Get all issue records
    @GetMapping("/all")
    public List<IssueRecord> getAllRecords() {
        return issueRecordRepository.findAll();
    }

    // 👤 Get issue records by user
    @GetMapping("/user/{userId}")
    public List<IssueRecord> getByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return issueRecordRepository.findByUser(user);
    }
}
