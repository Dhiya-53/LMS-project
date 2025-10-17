package com.library.library_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 📘 Basic details
    private String title;
    private String author;
    private String category;
    private String isbn;

    // 📦 Availability details
    private int totalCopies = 1;  // total copies of this book
    private int availableCopies = 1;  // copies currently available
    private boolean available = true;

    // 📖 Issuing info
    private boolean issued = false;
    private String issuedTo;

    // 🗓️ Issue and return tracking
    private LocalDate issueDate;
    private LocalDate dueDate;       // deadline for return
    private LocalDate returnDate;
    private double fine;             // fine for late return

    // =============================
    // 📍 Getters & Setters
    // =============================

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public String getIsbn() {
        return isbn;
    }
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public int getTotalCopies() {
        return totalCopies;
    }
    public void setTotalCopies(int totalCopies) {
        this.totalCopies = totalCopies;
    }

    public int getAvailableCopies() {
        return availableCopies;
    }
    public void setAvailableCopies(int availableCopies) {
        this.availableCopies = availableCopies;
    }

    public boolean isAvailable() {
        return available;
    }
    public void setAvailable(boolean available) {
        this.available = available;
    }

    public boolean isIssued() {
        return issued;
    }
    public void setIssued(boolean issued) {
        this.issued = issued;
    }

    public String getIssuedTo() {
        return issuedTo;
    }
    public void setIssuedTo(String issuedTo) {
        this.issuedTo = issuedTo;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }
    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }
    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public double getFine() {
        return fine;
    }
    public void setFine(double fine) {
        this.fine = fine;
    }
}

