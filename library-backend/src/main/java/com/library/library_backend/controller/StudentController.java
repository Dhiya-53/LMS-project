package com.library.library_backend.controller;

import com.library.library_backend.model.Book;
import com.library.library_backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:5174")
public class StudentController {

    @Autowired
    private BookRepository bookRepository;

    // Get all books
    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Search books by title or author
    @GetMapping("/books/search")
    public List<Book> searchBooks(@RequestParam String keyword) {
        String lowerKeyword = keyword.toLowerCase();
        return bookRepository.findAll().stream()
                .filter(b -> b.getTitle().toLowerCase().contains(lowerKeyword)
                        || b.getAuthor().toLowerCase().contains(lowerKeyword)
                        || b.getCategory().toLowerCase().contains(lowerKeyword))
                .collect(Collectors.toList());
    }
}
