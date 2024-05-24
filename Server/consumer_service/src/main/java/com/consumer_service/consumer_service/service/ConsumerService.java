package com.consumer_service.consumer_service.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.consumer_service.consumer_service.Dto.ProductDto;
import com.consumer_service.consumer_service.Dto.UserDto;
import com.consumer_service.consumer_service.entity.Product;
import com.consumer_service.consumer_service.entity.ProductType;
import com.consumer_service.consumer_service.entity.Purchase;
import com.consumer_service.consumer_service.entity.User;
import com.consumer_service.consumer_service.repository.ConsumerRepository;
import com.consumer_service.consumer_service.repository.ProductRepository;
import com.consumer_service.consumer_service.repository.ProductTypeRepository;
import com.consumer_service.consumer_service.repository.UserRepository;

@Service
public class ConsumerService implements IConsumerService {

    @Autowired
    private ConsumerRepository consumerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ProductDto getProduct(int id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(this::convertProductToDto).orElse(null);
    }

    @Override
    public UserDto registerUser(String username, String password, String role) {
        User user = new User();
        user.setName(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);

        User savedUser = userRepository.save(user);

        UserDto userDto = new UserDto();
        userDto.setId(savedUser.getId());
        userDto.setUsername(savedUser.getName());
        userDto.setPassword(savedUser.getPassword());
        userDto.setRole(savedUser.getRole());

        return userDto;
    }

    @Override
    public UserDto getUser(String username) {
        User user = userRepository.findByUsername(username);
        return convertUserToDto(user);
    }

    public boolean checkPassword(String plainPassword, String hashedPassword) {
        return passwordEncoder.matches(plainPassword, hashedPassword);
    }

    @Override
    public void addProductType(String name) {
        ProductType productType = new ProductType(name);
        productTypeRepository.save(productType);
    }

    @Override
    public void updateProductStock(int id, int newStock) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            Product updatedProduct = product.get();
            updatedProduct.setStock(newStock);
            productRepository.save(updatedProduct);
        }
    }

    @Override
    public List<ProductType> viewAllProductType() {
        return productTypeRepository.findAll();
    }

    @Override
    public ProductDto getProductByName(String name) {
        Product product = productRepository.findByName(name);
        return convertProductToDto(product);
    }

    @Override
    public void addPurchase(String username, String productName, int quantity) {
        Purchase purchase = new Purchase(username, productName, quantity);
        consumerRepository.save(purchase);
    }

    @Override
    public List<Purchase> viewPurchasesByName(String username) {
        return consumerRepository.findAllByUsername(username);
    }

    @Override
    public ProductDto convertProductToDto(Product product) {
        if (product == null)
            return null;

        ProductDto productDto = new ProductDto();
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setStock(product.getStock());
        productDto.setProductType(product.getProductType());
        return productDto;
    }

    @Override
    public UserDto convertUserToDto(User user) {
        if (user == null)
            return null;

        UserDto userDto = new UserDto();
        userDto.setUsername(user.getName());
        userDto.setRole(user.getRole());
        userDto.setPassword(user.getPassword());
        return userDto;
    }
}