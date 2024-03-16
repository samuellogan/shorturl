package com.samuellogan.shorturl.repository;

import com.samuellogan.shorturl.model.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {

    // Find a UrlMapping by the shortUrlCode
    @NonNull
    Optional<UrlMapping> findByShortUrlCode(String shortUrlCode);

}
