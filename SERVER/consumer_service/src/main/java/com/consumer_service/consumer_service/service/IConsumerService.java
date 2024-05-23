package com.consumer_service.consumer_service.service;

import java.util.List;

import com.consumer_service.consumer_service.Dto.ProductDto;
import com.consumer_service.consumer_service.Dto.UserDto;
import com.consumer_service.consumer_service.entity.Product;
import com.consumer_service.consumer_service.entity.ProductType;
import com.consumer_service.consumer_service.entity.Purchase;
import com.consumer_service.consumer_service.entity.User;

public interface IConsumerService {

    public ProductDto getProduct(int id);
    public UserDto convertUserToDto(User user);
    public ProductDto convertProductToDto(Product product);
    public void addPurchase(String username,String productname,int quantity);
    public UserDto getUser(String name);
    public void addProductType(String name);
    public void updateProductStock(int id,int newStock);
    public List<ProductType> viewAllProductType();
    public ProductDto getProductByName(String name);
     public List<Purchase> viewPurchasesByName(String name);
}
