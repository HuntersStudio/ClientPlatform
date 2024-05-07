/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.THS.userservice.services;

import com.THS.userservice.models.UserModel;
import com.THS.userservice.repositories.IUserRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Alicia
 */

@Service
public class UserService {
    
    @Autowired
    IUserRepository userRepository;
    
    private ArrayList<UserModel> getUsers(){
        return (ArrayList<UserModel>) userRepository.findAll();
    } 
}
