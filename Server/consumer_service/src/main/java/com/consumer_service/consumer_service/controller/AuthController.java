package com.consumer_service.consumer_service.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.consumer_service.consumer_service.Dto.UserDto;
import com.consumer_service.consumer_service.config.JwtGenerator;
import com.consumer_service.consumer_service.service.ConsumerService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    ConsumerService consumerService;
    public static String role;

    public AuthController(ConsumerService consumerService) {
        this.consumerService = consumerService;
    }

    @GetMapping("/login/{name}")
    public String login(@PathVariable("name") String name) {

        UserDto user = consumerService.getUser(name);

        role = user.getRole();

        System.out.println(role);

        return JwtGenerator.generateToken(user.getUsername(), role);

    }

}
