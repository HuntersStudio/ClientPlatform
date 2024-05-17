package com.consumer_service.consumer_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.consumer_service.consumer_service.Dto.ProductDto;
import com.consumer_service.consumer_service.Dto.UserDto;
import com.consumer_service.consumer_service.entiy.Product;
import com.consumer_service.consumer_service.entiy.ProductType;
import com.consumer_service.consumer_service.entiy.Purchase;
import com.consumer_service.consumer_service.entiy.User;
import com.consumer_service.consumer_service.repository.ConsumerRepository;

@Service
public class ConsumerService implements IConsumerService {
    
    @Autowired
    RestTemplate restTemplate;

    @Autowired
    ConsumerRepository consumerRepository;

    @Override
    public ProductDto getProduct(int id) {   
       
        Product product = restTemplate.getForObject("http://localhost:8002/product/getProductById/" + id,Product.class);

        return convertProductToDto(product);

    }

    @Override
    public UserDto getUser(String name) {

        User user = restTemplate.getForObject("http://localhost:8001/user/getUserByname/" + name,User.class);
        return convertUserToDto(user);      
    }

    @Override
    public void addProductType(String name){

            restTemplate.postForEntity("http://localhost:8002/product/addProductType/"+name,name,String.class);

    }

    @Override
    public void updateProductStock(int id,int newStock){
        restTemplate.postForEntity("http://localhost:8002/product/updateProductStock/"+id+","+newStock,id,String.class);
    }

    @Override
    public List<ProductType> viewAllProductType(){
        
     @SuppressWarnings("unchecked")
    List<ProductType> productTypes = restTemplate.getForObject("http://localhost:8002/product/getAllProductTypes",List.class);

        return productTypes;
    }

    @Override
    public ProductDto getProductByName(String name){
        
        Product product = restTemplate.getForObject("http://localhost:8002/product/getProductByName/" + name,Product.class);

        return convertProductToDto(product);
    }


    @Override
    public void addPurchase(String username,String productname,int quantity){

        Purchase purchase = new Purchase( username, productname, quantity );

        consumerRepository.save(purchase);
        
    }

    @Override
    public List<Purchase> viewPurchasesByName(String username){

        List<Purchase> purchases = consumerRepository.findAllByUsername(username);

        return purchases;

    }

    @Override
    public ProductDto convertProductToDto(Product product){
        ProductDto productDto = new ProductDto();
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setStock(product.getStock());
        productDto.setProductType(product.getProductType());
        return productDto;
    }

    @Override
    public UserDto convertUserToDto(User user){

        UserDto userdto = new UserDto();
        userdto.setUsername(user.getName());
        userdto.setRole(user.getRole());
        return userdto;
    }
}
