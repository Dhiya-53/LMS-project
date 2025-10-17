package com.library.library_backend.controller;

import com.library.library_backend.model.Book;
import com.library.library_backend.model.IssueRecord;
import com.library.library_backend.model.User;
import com.library.library_backend.repository.BookRepository;
import com.library.library_backend.repository.IssueRecordRepository;
import com.library.library_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RestController
@RequestMapping("/teacher")
@CrossOrigin(origins = "http://localhost:5174")
public class TeacherController {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IssueRecordRepository issueRecordRepository;

    // 📚 Get all books
    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // ➕ Add a new book
    @PostMapping("/books/add")
    public ResponseEntity<?> addBook(@RequestBody Book book) {
        if (book.getTitle() == null || book.getTitle().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("❌ Title is required");
        }
        if (book.getAvailableCopies() <= 0) book.setAvailableCopies(1);
        book.setAvailable(true);
        return ResponseEntity.ok(bookRepository.save(book));
    }

    // 📤 Issue a book
    @PostMapping("/books/issue")
    public ResponseEntity<?> issueBook(@RequestParam Long userId, @RequestParam Long bookId) {
        try {
            User user = userRepository.findById(userId).orElseThrow();
            Book book = bookRepository.findById(bookId).orElseThrow();

            if (book.getAvailableCopies() <= 0)
                return ResponseEntity.badRequest().body("❌ No copies available");

            // Check if already issued
            boolean alreadyIssued = issueRecordRepository.findByUserAndReturnedFalse(user)
                    .stream()
                    .anyMatch(r -> r.getBook().getId().equals(bookId));

            if (alreadyIssued)
                return ResponseEntity.badRequest().body("⚠️ Already issued to this user");

            // Issue record
            LocalDate issueDate = LocalDate.now();
            LocalDate dueDate = issueDate.plusDays(7);

            IssueRecord record = new IssueRecord(user, book, issueDate, dueDate);
            issueRecordRepository.save(record);

            book.setAvailableCopies(book.getAvailableCopies() - 1);
            bookRepository.save(book);

            return ResponseEntity.ok("✅ Book issued to " + user.getUsername() + " (Due: " + dueDate + ")");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ " + e.getMessage());
        }
    }

    // 📥 Return a book
    @PutMapping("/books/return/{recordId}")
    public ResponseEntity<?> returnBook(@PathVariable Long recordId) {
        try {
            IssueRecord record = issueRecordRepository.findById(recordId).orElseThrow();
            if (record.isReturned()) return ResponseEntity.badRequest().body("⚠️ Already returned");

            record.setReturned(true);
            record.setReturnDate(LocalDate.now());

            long lateDays = ChronoUnit.DAYS.between(record.getDueDate(), record.getReturnDate());
            double fine = lateDays > 0 ? lateDays * 5.0 : 0.0;
            record.setFine(fine);

            Book book = record.getBook();
            book.setAvailableCopies(book.getAvailableCopies() + 1);
            bookRepository.save(book);

            issueRecordRepository.save(record);

            return ResponseEntity.ok(
                    fine > 0
                            ? "✅ Returned with fine ₹" + fine
                            : "✅ Returned on time"
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ " + e.getMessage());
        }
    }

    // 🗑 Delete book
    @DeleteMapping("/books/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        try {
            List<IssueRecord> active = issueRecordRepository.findByBookIdAndReturnedFalse(id);
            if (!active.isEmpty())
                return ResponseEntity.badRequest().body("❌ Can't delete. Book is currently issued.");

            bookRepository.deleteById(id);
            return ResponseEntity.ok("🗑 Deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ " + e.getMessage());
        }
    }

    // 📊 Get all issue records
    @GetMapping("/issues")
    public List<IssueRecord> getAllIssueRecords() {
        return issueRecordRepository.findAll();
    }

    // 🔁 Active issues
    @GetMapping("/issues/active")
    public List<IssueRecord> getActiveIssues() {
        return issueRecordRepository.findByReturnedFalse();
    }

    // ⏰ Overdue issues
    @GetMapping("/issues/overdue")
    public List<IssueRecord> getOverdueIssues() {
        return issueRecordRepository.findOverdueRecords(LocalDate.now());
    }

    // 👤 User-specific issues
    @GetMapping("/issues/user/{userId}")
    public List<IssueRecord> getByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return issueRecordRepository.findByUser(user);
    }
}
