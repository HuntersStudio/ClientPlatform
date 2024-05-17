package com.user_service.user_service.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.user_service.user_service.Dto.UserDto;
import com.user_service.user_service.entity.User;
import com.user_service.user_service.service.UserService;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAll(){
        
        List<User> users = userService.getAll();

        if(users.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(users);
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<User> getById(@PathVariable("id") int id){
        
     User user = userService.getUserByID(id);

        if(user==null){
            return ResponseEntity.notFound().build();
        } 

        return ResponseEntity.ok(user);
    }

    @GetMapping("/getUserByname/{name}")
    public ResponseEntity<UserDto> getByName(@PathVariable("name") String name){

        return ResponseEntity.ok(userService.findUserByName(name));
    }

    

    @PostMapping("/addUser")
    public ResponseEntity<User> save(@RequestBody() Map<String, Object> productMap){

       String userName = (String) productMap.get("name");
       String password = (String) productMap.get("password"); 
       String email = (String) productMap.get("email");
       
    User user = new User(userName,password,email);

    userService.save(user);
    return  ResponseEntity.ok(user); 
    }   


    @PostMapping("/deleteUser/{name}")
    public String deleteUser(@PathVariable String name){
        
        UserDto user = userService.findUserByName(name);
        
        if(user==null){
            return "El usuario que quieres borrar no existe";
        }

        userService.deleteUser(user.getName());
        return "Usuario borrado correctamente";
    }

    @PostMapping("/updateUser/{id}")
    public String updateUser(@PathVariable int id,@RequestBody() Map<String, Object> productMap){

        User existingUser = userService.getUserByID(id);

        String userName = (String) productMap.get("name");
        String password = (String) productMap.get("password");
        String email = (String) productMap.get("email");

       
        existingUser.setName(userName);
        existingUser.setPassword(password);
        existingUser.setEmail(email);

        userService.updateUser(existingUser);
        
        return "Usuario actualizado correctamente\n"+existingUser;
    }
}
