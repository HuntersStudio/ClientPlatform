package com.consumer_service.consumer_service.repository;

import org.springframework.stereotype.Repository;

import com.consumer_service.consumer_service.entity.Purchase;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class ConsumerRepository {

    private final EntityManager entityManager;

    public ConsumerRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(Purchase purchase) {
        entityManager.persist(purchase);
    }
    
    // Puedes agregar más métodos según sea necesario
}