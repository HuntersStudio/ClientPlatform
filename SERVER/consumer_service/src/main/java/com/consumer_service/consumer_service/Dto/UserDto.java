package com.consumer_service.consumer_service.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    String username;
    String role;
    String password;
    String email;
    
}
