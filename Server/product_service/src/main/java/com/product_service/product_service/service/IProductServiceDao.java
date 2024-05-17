package com.product_service.product_service.service;

import com.product_service.product_service.dto.ProductDto;
import com.product_service.product_service.entity.Product;
import com.product_service.product_service.entity.ProductType;

import java.util.List;

public interface IProductServiceDao {

    public List<Product> getAll();
    public ProductDto getProductByID(int id);
    public Product save(Product product);
    public ProductDto getProductByName(String name);
    public ProductDto convertToDto(Product product);
    public void deleteProduct(int id);
    public void updateProduct(Product product);
    public ProductType getTypeByName(String typeName);
    public ProductType addProductType(ProductType productType);
    public List<ProductType> viewProductType();
    
}
