package com.samuellogan.shorturl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.samuellogan.shorturl.model.UrlMapping;
import com.samuellogan.shorturl.service.UrlMappingService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
public class UrlGetController {
    private final UrlMappingService urlMappingService;

    @Autowired
    public UrlGetController(UrlMappingService urlMappingService) {
        this.urlMappingService = urlMappingService;
    }

    @GetMapping("/{shortUrlCode:[a-zA-Z0-9]{8}}")
    public ResponseEntity<Object> getShortUrl(@PathVariable String shortUrlCode, HttpServletResponse response) {
        return urlMappingService.findByShortUrlCode(shortUrlCode)
                .map(urlMapping -> {
                    urlMappingService.incrementVisitCount(shortUrlCode);
                    response.setHeader("Location", urlMapping.getOriginalUrl());
                    return new ResponseEntity<>(HttpStatus.MOVED_PERMANENTLY);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
