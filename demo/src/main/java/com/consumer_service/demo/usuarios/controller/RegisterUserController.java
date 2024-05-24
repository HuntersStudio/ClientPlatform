package com.consumer_service.demo.usuarios.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.consumer_service.demo.usuarios.dto.UserRegisterDTO;
import com.consumer_service.demo.usuarios.services.UserService;

@Controller
@RequestMapping("/register")
public class RegisterUserController {

    private final UserService userService;

    @Autowired
    public RegisterUserController(UserService userService) {
        this.userService = userService;
    }

    @ModelAttribute("usuario")
    public UserRegisterDTO returnNewUserRegisterDTO() {
        return new UserRegisterDTO();
    }

    @GetMapping
    public String viewFormRegister() {
        return "register";
    }

    @PostMapping
    public String registerUserCount(@ModelAttribute("user") UserRegisterDTO registerDTO) {
        userService.save(registerDTO);
        return "redirect:/register?success";
    }
}