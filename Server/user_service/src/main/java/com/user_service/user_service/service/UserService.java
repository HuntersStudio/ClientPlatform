
package com.user_service.user_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.user_service.user_service.Dto.UserDto;
import com.user_service.user_service.entity.User;
import com.user_service.user_service.repository.UserDao;

@Service
public class UserService implements IUserService{

    @Autowired
    UserDao userDao;


    public List<User> getAll() {
        return userDao.findAll();
    }

    public User getUserByID(int id) {

        User user = userDao.findById(id);
        return user;

    }

    public User save(User user) {
        User userNew = userDao.save(user);
        return userNew;
    }

    

    @Override
    public UserDto findUserByName(String name) {

        User user = userDao.findByname(name);
        return convertToDto(user);

    }

    @Override
    public void deleteUser(String name) {
        userDao.deleteByName(name);
    }

    @Override
    public void updateUser(User user) {

        userDao.save(user);
    }

    @Override
    public UserDto convertToDto(User user) {
        UserDto userdto = new UserDto();

        userdto.setName(user.getName());
        userdto.setEmail(user.getEmail());
        userdto.setRole(user.getRoles().iterator().next().getRole().getValue());
        userdto.setPassword(user.getPassword());

        return userdto;
    }

 
}
