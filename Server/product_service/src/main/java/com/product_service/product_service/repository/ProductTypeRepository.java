package com.product_service.product_service.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.product_service.product_service.entity.ProductType;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Integer>{
    ProductType findByTypeName(String typeName);
}  
