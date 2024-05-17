package com.user_service.user_service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;
import com.user_service.user_service.Dto.UserDto;
import com.user_service.user_service.entity.Role;
import com.user_service.user_service.entity.RoleType;
import com.user_service.user_service.entity.User;
import com.user_service.user_service.repository.UserDao;
import com.user_service.user_service.service.UserService;

public class UserServiceTest {


    @InjectMocks
    private UserService userService;

    @Mock
    private UserDao userDao;

    @Mock
    private RestTemplate restTemplate;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }
    
 @Test
    public void testGetAllreturnAllCorrectUsers() {
        List<User> userList = new ArrayList<>();
        userList.add(new User(1, "alex","1234", "alex@alex.com", new HashSet<>()));
        userList.add(new User(1, "alex","1234", "alex@alex.com", new HashSet<>()));

        when(userDao.findAll()).thenReturn(userList);

        List<User> result = userService.getAll();
        assertEquals(2, result.size());
    }


    @Test
    public void testSave_SavesTheCorrectUser() {
        User user = new User(11, "alex","1234", "alex@alex.com", new HashSet<>());
        
        when(userDao.save(user)).thenReturn(user);

        User result = userService.save(user);
        assertEquals(user, result);
    }

    @Test
    public void testFindUserByName() {
        Set<Role> roles = new HashSet<>();
        roles.add(new Role(1, RoleType.USER));
        User user = new User(1, "alex","1234", "alex@alex.com", roles);
        when(userDao.findByname("John")).thenReturn(user);

        UserDto userDto = userService.findUserByName("John");
        assertEquals("John", userDto.getName());
        assertEquals("john@example.com", userDto.getEmail());
    }


    @Test
    public void testUpdateUser() {
        Set<Role> roles = new HashSet<>();
        roles.add(new Role(1, RoleType.USER));
        User user = new User(1, "alex","1234", "alex@alex.com", roles);
        userService.updateUser(user);
        verify(userDao, times(1)).save(user);
    }
}
