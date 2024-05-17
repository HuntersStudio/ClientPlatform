package com.product_service.product_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;
    private int price;
    private int stock;
    
    
    @ManyToOne
    @JoinColumn(name = "product_type_id",nullable = false)
    private ProductType productType; 

    
    public Product(String name,String description,int price,int stock,ProductType productType){

        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.productType = productType;
    }

}
