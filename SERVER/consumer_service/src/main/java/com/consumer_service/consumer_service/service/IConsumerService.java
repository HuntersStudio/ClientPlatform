package com.consumer_service.consumer_service.service;

import java.util.List;

import com.consumer_service.consumer_service.Dto.ProductDto;
import com.consumer_service.consumer_service.Dto.UserDto;
import com.consumer_service.consumer_service.entity.Product;
import com.consumer_service.consumer_service.entity.ProductType;
import com.consumer_service.consumer_service.entity.Purchase;
import com.consumer_service.consumer_service.entity.User;

public interface IConsumerService {

    ProductDto getProduct(int id);

    UserDto registerUser(String username, String password, String role);

    UserDto getUser(String name);

    void addProductType(String name);

    void updateProductStock(int id, int newStock);

    List<ProductType> viewAllProductType();

    ProductDto getProductByName(String name);

    void addPurchase(String username, String productName, int quantity);

    List<Purchase> viewPurchasesByName(String username);

    ProductDto convertProductToDto(Product product);

    UserDto convertUserToDto(User user);
}