package com.consumer_service.demo.usuarios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterDTO {

    private Long id;
    private String nombre;
    private String apellidos;
    private String email;
    private String password;

    public UserRegisterDTO(String nombre, String apellidos, String email, String password) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
    }

    public UserRegisterDTO(String email) {
        this.email = email;
    }
}