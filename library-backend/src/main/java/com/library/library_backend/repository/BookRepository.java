package com.library.library_backend.repository;

import com.library.library_backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    
    // Search methods
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByAuthorContainingIgnoreCase(String author);
    List<Book> findByCategoryContainingIgnoreCase(String category);
    Optional<Book> findByIsbn(String isbn);
    
    // Availability methods
    List<Book> findByAvailableCopiesGreaterThan(int count);
    List<Book> findByAvailableTrue();
    
    // Combined search
    @Query("SELECT b FROM Book b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.category) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "b.isbn LIKE CONCAT('%', :query, '%')")
    List<Book> searchBooks(String query);
}