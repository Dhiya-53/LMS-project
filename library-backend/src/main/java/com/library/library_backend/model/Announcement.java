package com.library.library_backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "announcements")
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String message;
    private String createdByName;
    private String createdByRole;
    private boolean sendToAll;
    private String type;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    // ✅ Constructors
    public Announcement() {}

    public Announcement(String title, String message, String createdByName, String createdByRole, boolean sendToAll, String type, Date createdAt) {
        this.title = title;
        this.message = message;
        this.createdByName = createdByName;
        this.createdByRole = createdByRole;
        this.sendToAll = sendToAll;
        this.type = type;
        this.createdAt = createdAt;
    }

    // ✅ Getters and Setters
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCreatedByName() {
        return createdByName;
    }

    public void setCreatedByName(String createdByName) {
        this.createdByName = createdByName;
    }

    public String getCreatedByRole() {
        return createdByRole;
    }

    public void setCreatedByRole(String createdByRole) {
        this.createdByRole = createdByRole;
    }

    public boolean isSendToAll() {
        return sendToAll;
    }

    public void setSendToAll(boolean sendToAll) {
        this.sendToAll = sendToAll;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}

