package com.samuellogan.shorturl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.samuellogan.shorturl.model.UrlMapping;
import com.samuellogan.shorturl.service.UrlMappingService;

import java.util.List;

@RestController
@RequestMapping("/api/urls") // Base path for all URLs handled by this controller
public class UrlApiController {

    private final UrlMappingService urlMappingService;

    @Autowired
    public UrlApiController(UrlMappingService urlMappingService) {
        this.urlMappingService = urlMappingService;
    }

    @PostMapping("/create")
    public ResponseEntity<UrlMapping> createShortUrl(@RequestParam String originalUrl) {
        UrlMapping urlMapping = urlMappingService.createShortUrl(originalUrl);
        return ResponseEntity.ok(urlMapping);
    }

    

    @GetMapping
    public ResponseEntity<List<UrlMapping>> getAllShortUrls() {
        List<UrlMapping> urlMappings = urlMappingService.findAll();
        return ResponseEntity.ok(urlMappings);
    }

    @PostMapping("/{shortUrlCode}/increment")
    public ResponseEntity<Void> incrementVisit(@PathVariable String shortUrlCode) {
        urlMappingService.incrementVisitCount(shortUrlCode);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{shortUrlCode}")
    public ResponseEntity<Void> deleteShortUrl(@PathVariable String shortUrlCode) {
        urlMappingService.deleteUrlMapping(shortUrlCode);
        return ResponseEntity.ok().build();
    }
}
