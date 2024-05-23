package com.consumer_service.consumer_service.service;

import com.consumer_service.consumer_service.Dto.UserDto;
import com.consumer_service.consumer_service.entity.User;
import com.consumer_service.consumer_service.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ConsumerServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private ConsumerService consumerService;

    @Test
    public void testRegisterUser() {
        String username = "testUser";
        String password = "testPass";
        String encodedPassword = "encodedPass";
        String role = "ROLE_USER";

        when(userRepository.findByUsername(username)).thenReturn(null);
        when(passwordEncoder.encode(password)).thenReturn(encodedPassword);
        
        UserDto user = consumerService.registerUser(username, password, role);

        assertNotNull(user);
        assertEquals(username, user.getUsername());
    }

    @Test
    public void testGetUser() {
        String username = "testUser";
        User user = new User(username, "encodedPass", "ROLE_USER");
        
        when(userRepository.findByUsername(username)).thenReturn(user);
        UserDto result = consumerService.getUser(username);

        assertNotNull(result);
        assertEquals(username, result.getUsername());
    }
}