package com.consumer_service.consumer_service.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @SuppressWarnings("removal")
    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());
        http.authorizeHttpRequests(authz -> authz
               /*  .requestMatchers("/consumer/updateProductStock/**").hasRole("ADMIN")
                .requestMatchers("/auth/login/**").permitAll()
                .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll()*/
                .anyRequest().permitAll());
               /*  .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilter(new JwtAuthenticationFilter(authenticationManager()))
                .addFilterBefore(new JwtAuthenticationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class);*/
        http.headers(headers -> headers.frameOptions().disable());
        return http.build();
    }
    
    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(Arrays.asList(new DaoAuthenticationProvider()));
    }
}
