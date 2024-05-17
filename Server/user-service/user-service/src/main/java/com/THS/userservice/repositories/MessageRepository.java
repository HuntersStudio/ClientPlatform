/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.THS.userservice.repositories;

import com.THS.userservice.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Alicia
 */
public interface MessageRepository extends JpaRepository<Message, Long> {
}
