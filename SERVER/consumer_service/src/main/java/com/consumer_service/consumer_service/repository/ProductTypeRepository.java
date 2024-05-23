package com.consumer_service.consumer_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.consumer_service.consumer_service.entity.ProductType;

public interface ProductTypeRepository extends JpaRepository<ProductType, Integer> {
}