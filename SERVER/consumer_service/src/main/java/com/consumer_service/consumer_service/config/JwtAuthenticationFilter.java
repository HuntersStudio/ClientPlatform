package com.consumer_service.consumer_service.config;


import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.consumer_service.consumer_service.controller.AuthController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

   public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
       super(authenticationManager);
   }

   @Override
   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
       String header = request.getHeader("Authorization");
       if (header == null || !header.startsWith("Bearer ")) {
           chain.doFilter(request, response);
           return;
       }
       UsernamePasswordAuthenticationToken authentication = getAuthentication(request);
       SecurityContextHolder.getContext().setAuthentication(authentication);
       chain.doFilter(request, response);
   }

   public UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
    String token = request.getHeader("Authorization");
    if (token != null) {
        String username = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(JwtGenerator.SECRET_KEY.getEncoded()))
                .build()
                .parseClaimsJws(token.replace("Bearer ", ""))
                .getBody()
                .getSubject();
        if (username != null) {
            String role = AuthController.role;
            if (role != null && !role.isEmpty()) { 
                return new UsernamePasswordAuthenticationToken(username, null, Collections.singleton(new SimpleGrantedAuthority(role)));
            }
        }
    }
    return null;
}
}