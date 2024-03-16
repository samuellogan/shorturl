package com.samuellogan.shorturl.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Example: Customize to suit your needs
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
        // Add configurations to adjust how static resources are handled
        // Ensure dynamic URL paths are not treated as requests for static resources
    }
}
