package com.samuellogan.shorturl.service;

import com.samuellogan.shorturl.model.UrlMapping;
import java.util.List;
import java.util.Optional;

public interface UrlMappingService {

    UrlMapping createShortUrl(String originalUrl);

    Optional<UrlMapping> findByShortUrlCode(String shortUrlCode);

    List<UrlMapping> findAll();

    void incrementVisitCount(String shortUrlCode);

    void deleteUrlMapping(String shortUrlCode);
}
