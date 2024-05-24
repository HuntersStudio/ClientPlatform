package com.consumer_service.demo.usuarios.services;

import com.consumer_service.demo.usuarios.dto.UserRegisterDTO;
import com.consumer_service.demo.usuarios.models.User;

public interface UserService {

    public User save(UserRegisterDTO registerDTO);
}
