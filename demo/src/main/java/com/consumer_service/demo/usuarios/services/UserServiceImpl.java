package com.consumer_service.demo.usuarios.services;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.consumer_service.demo.usuarios.dto.UserRegisterDTO;
import com.consumer_service.demo.usuarios.models.Rol;
import com.consumer_service.demo.usuarios.models.User;
import com.consumer_service.demo.usuarios.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User save(UserRegisterDTO registerDTO) {
        User user = new User(registerDTO.getNombre(),
                registerDTO.getApellidos(),
                registerDTO.getEmail(),
                registerDTO.getPassword(),
                Arrays.asList(new Rol("ROLE_USER")));

        return userRepository.save(user);
    }
}
