package com.consumer_service.consumer_service.entiy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    private int id_Product;
    private String name;
    private String description;
    private int price;
    private int Stock;
    private String productType;
    
}
