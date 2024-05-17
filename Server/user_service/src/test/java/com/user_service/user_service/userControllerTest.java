package com.user_service.user_service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import com.user_service.user_service.controller.UserController;
import com.user_service.user_service.entity.User;
import com.user_service.user_service.repository.UserDao;
import com.user_service.user_service.service.UserService;
import java.util.*;

@SpringBootTest
class userControllerTest {

	  @Mock
    UserService userService;
    @Mock
    UserDao userDao;

    @InjectMocks
    UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @SuppressWarnings("deprecation")
	@Test
    void testGetAll() {
        // Given
        User user1 = new User("Alex","1234", "alex@alex.com");
        User user2 = new User("pedro","12342", "pedro@pedro.com");
        List<User> users = Arrays.asList(user1, user2);
        when(userService.getAll()).thenReturn(users);

        // When
        ResponseEntity<List<User>> responseEntity = userController.getAll();

        // Then
        assertEquals(users, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
    }

    @SuppressWarnings("deprecation")
	@Test
    void testSave() {

        // Given
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("name", "Alex");
        userMap.put("password", "1234");
        userMap.put("email", "Alex@alex.com");
        User user = new User("Alex","1234", "Alex@alex.com");
        when(userService.save(any(User.class))).thenReturn(user);

        // When
        ResponseEntity<User> responseEntity = userController.save(userMap);

        // Then
        assertEquals(user, responseEntity.getBody());
        assertEquals(200, responseEntity.getStatusCodeValue());
    }

	 @Test
    void testDeleteUser() {
        // Given
        String userName = "paco";
        int id =  1;
        User user = new User(id,userName,"1234", "paco@paco.com", null);
        when(userDao.findByname(userName)).thenReturn(user);

        // When
        String response = userController.deleteUser(userName);

        // Then
        assertEquals("Usuario borrado correctamente", response);
        verify(userService, times(1)).getUserByID(id);
        verify(userService, times(1)).deleteUser(userName);
    }

    @Test
    void testDeleteUser_UserNotFound() {
        // Given
        String userName = "asda";
        when(userDao.findByname(userName)).thenReturn(null);

        // When
        String response = userController.deleteUser(userName);

        // Then
        assertEquals("El usuario que quieres borrar no existe", response);
        verify(userService, times(1)).findUserByName(userName);
        verify(userService, never()).deleteUser(userName);
    }

	@Test
    void testUpdateUser() {
        // Given
        int userId = 1;
        String newName = "New Name";
        String newPassword ="1234";
        String newEmail = "newemail@newemail.com";
        User existingUser = new User("Old Name","1234", "oldemail@oldemail.com");
        when(userService.getUserByID(userId)).thenReturn(existingUser);

        Map<String, Object> userData = new HashMap<>();
        userData.put("name", newName);
        userData.put("password",newPassword);
        userData.put("email", newEmail);

        // When
        String response = userController.updateUser(userId, userData);

        // Then
        assertEquals("Usuario actualizado correctamente\n" + existingUser, response);
        assertEquals(newName, existingUser.getName());
        assertEquals(newPassword,existingUser.getPassword());
        assertEquals(newEmail, existingUser.getEmail());
        verify(userService, times(1)).getUserByID(userId);
        verify(userService, times(1)).updateUser(existingUser);
    }

   
}
