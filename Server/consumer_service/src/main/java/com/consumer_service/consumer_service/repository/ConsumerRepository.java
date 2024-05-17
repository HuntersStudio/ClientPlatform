package com.consumer_service.consumer_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.consumer_service.consumer_service.entiy.Purchase;

@Repository
public interface ConsumerRepository extends JpaRepository<Purchase,Integer>{

    public List<Purchase> findAllByUsername(String username);

}
