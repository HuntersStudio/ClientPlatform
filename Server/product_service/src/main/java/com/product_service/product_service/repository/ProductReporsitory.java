package com.product_service.product_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.product_service.product_service.entity.Product;

@Repository
public interface ProductReporsitory extends JpaRepository<Product,Integer>{

    public Product getProductByName(String name);
    public Product findById(int id);
}
