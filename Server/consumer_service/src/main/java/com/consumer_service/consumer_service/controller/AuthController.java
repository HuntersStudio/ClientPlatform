package com.consumer_service.consumer_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.consumer_service.consumer_service.Dto.UserDto;
import com.consumer_service.consumer_service.config.JwtGenerator;
import com.consumer_service.consumer_service.service.ConsumerService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private ConsumerService consumerService;

    public static String role;

    @PostMapping("/register")
    public String register(@RequestParam String username, @RequestParam String password, @RequestParam String role) {
        UserDto existingUser = consumerService.getUser(username);
        if (existingUser != null) {
            return "Username already exists";
        }
        consumerService.registerUser(username, password, role);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        UserDto user = consumerService.getUser(username);

        if (user != null && consumerService.checkPassword(password, user.getPassword())) {
            role = user.getRole();
            System.out.println(role);
            return JwtGenerator.generateToken(user.getUsername(), role);
        } else {
            return "Invalid username or password";
        }
    }
}