package com.consumer_service.consumer_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.consumer_service.consumer_service.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}