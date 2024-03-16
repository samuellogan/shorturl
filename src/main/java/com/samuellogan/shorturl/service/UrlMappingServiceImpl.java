package com.samuellogan.shorturl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.samuellogan.shorturl.model.UrlMapping;
import com.samuellogan.shorturl.repository.UrlMappingRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UrlMappingServiceImpl implements UrlMappingService {

    private final UrlMappingRepository urlMappingRepository;

    @Autowired
    public UrlMappingServiceImpl(UrlMappingRepository urlMappingRepository) {
        this.urlMappingRepository = urlMappingRepository;
    }

    @Override
    public UrlMapping createShortUrl(String originalUrl) {
        String shortUrlCode = generateShortUrlCode();
        UrlMapping urlMapping = new UrlMapping(originalUrl, shortUrlCode);
        return urlMappingRepository.save(urlMapping);
    }

    @Override
    public Optional<UrlMapping> findByShortUrlCode(String shortUrlCode) {
        return urlMappingRepository.findByShortUrlCode(shortUrlCode);
    }

    @Override
    public List<UrlMapping> findAll() {
        return urlMappingRepository.findAll();
    }

    @Override
    public void incrementVisitCount(String shortUrlCode) {
        urlMappingRepository.findByShortUrlCode(shortUrlCode).ifPresent(urlMapping -> {
            urlMapping.setVisitCount(urlMapping.getVisitCount() + 1);
            urlMappingRepository.save(urlMapping);
        });
    }

    @Override
    @SuppressWarnings("null")
    public void deleteUrlMapping(String shortUrlCode) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrlCode(shortUrlCode)
                .orElseThrow(() -> new EntityNotFoundException("UrlMapping not found for code: " + shortUrlCode));
        urlMappingRepository.delete(urlMapping);
    }


    private String generateShortUrlCode() {
        // Simple UUID-based implementation. Consider using a more sophisticated method.
        return UUID.randomUUID().toString().substring(0, 8);
    }
}
