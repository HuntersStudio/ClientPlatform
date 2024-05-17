package com.user_service.user_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.user_service.user_service.entity.User;



@Repository
public interface UserDao extends JpaRepository<User,Integer>{

    User findByname(String name);
    User findById(int id);
    void deleteByName(String name);    

}
