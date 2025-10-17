package com.library.library_backend.repository;

import com.library.library_backend.model.IssueRecord;
import com.library.library_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {
    List<IssueRecord> findByUser(User user);
    List<IssueRecord> findByUserAndReturnedFalse(User user);
    List<IssueRecord> findByBookIdAndReturnedFalse(Long bookId);
    List<IssueRecord> findByReturnedFalse();

    @Query("SELECT r FROM IssueRecord r WHERE r.returned = false AND r.dueDate < :today")
    List<IssueRecord> findOverdueRecords(LocalDate today);
}
