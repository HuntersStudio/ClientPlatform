package com.consumer_service.consumer_service.entiy;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class User {
    
    private String name;
    private String password;
    private String role;
    private String email;
    
    
    public User(String name,String password,String email,String role){

        this.name = name;
        this.password = password;
        this.role = role;
        this.email = email;

    }

}
