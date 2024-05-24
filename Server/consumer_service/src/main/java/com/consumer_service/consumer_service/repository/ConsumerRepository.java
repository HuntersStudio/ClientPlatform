package com.consumer_service.consumer_service.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.consumer_service.consumer_service.entity.Purchase;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@Repository
public class ConsumerRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Purchase> findAllByUsername(String username) {
        String jpql = "SELECT p FROM Purchase p WHERE p.username = :username";
        TypedQuery<Purchase> query = entityManager.createQuery(jpql, Purchase.class);
        query.setParameter("username", username);
        return query.getResultList();
    }

    @Transactional
    public void save(Purchase purchase) {
        if (purchase.getId() == null) {
            entityManager.persist(purchase);
        } else {
            entityManager.merge(purchase);
        }
    }
}