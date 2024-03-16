package com.samuellogan.shorturl.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "url_mappings")
public class UrlMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 2048)
    private String originalUrl;

    @Column(nullable = false, unique = true)
    private String shortUrlCode;

    @Column(nullable = false)
    private Long visitCount = 0L;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;

    @Column(nullable = false)
    private Boolean isDeleted = false;

    // Constructor
    public UrlMapping() {
    }

    public UrlMapping(String originalUrl, String shortUrlCode) {
        this.originalUrl = originalUrl;
        this.shortUrlCode = shortUrlCode;
        this.visitCount = 0L;
        this.isDeleted = false;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public String getShortUrlCode() {
        return shortUrlCode;
    }

    public void setShortUrlCode(String shortUrlCode) {
        this.shortUrlCode = shortUrlCode;
    }

    public Long getVisitCount() { // Ensure this getter is present
        return visitCount;
    }

    public void setVisitCount(Long visitCount) { // And the corresponding setter
        this.visitCount = visitCount;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
