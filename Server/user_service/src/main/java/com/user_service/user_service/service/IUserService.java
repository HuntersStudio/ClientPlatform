package com.user_service.user_service.service;

import com.user_service.user_service.Dto.UserDto;
import com.user_service.user_service.entity.User;

public interface IUserService{

    public UserDto findUserByName(String name);
    public void deleteUser(String name);
    public void updateUser(User user);
    public UserDto convertToDto(User user);
    
}
