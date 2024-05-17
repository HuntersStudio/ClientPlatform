
package com.product_service.product_service.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.product_service.product_service.dto.ProductDto;
import com.product_service.product_service.entity.Product;
import com.product_service.product_service.entity.ProductType;
import com.product_service.product_service.repository.ProductReporsitory;
import com.product_service.product_service.repository.ProductTypeRepository;

@Service
public class ProductService implements IProductServiceDao {

    @Autowired
    ProductReporsitory productRepository;

     @Autowired
     ProductTypeRepository productTypeRepository;

    
    @Override
    public List<Product> getAll() {

        return productRepository.findAll();

    }


    @Override
    public List<ProductType> viewProductType(){

        return productTypeRepository.findAll();
    }

    @Override
    public ProductDto getProductByID(int id) {

        Product product = productRepository.findById(id);
        
        return convertToDto(product);

    }

    @Override
    public Product save(Product product) {

        Product productNew = productRepository.save(product);
        return productNew;

    }

    @Override
    public ProductDto getProductByName(String name) {
        Product product = productRepository.getProductByName(name);

        return convertToDto(product);

    }
    
    @Override
    public void deleteProduct(int id) {

        productRepository.deleteById(id);

    }

    @Override
    public void updateProduct(Product product){

        productRepository.save(product);
    }

    @Override
    public ProductDto convertToDto(Product product){

        ProductDto productDto = new ProductDto();

        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setStock(product.getStock());
        productDto.setProductType(product.getProductType().getTypeName().toString());

        return productDto;
    }


    @Override
    public ProductType getTypeByName(String typeName) {
        
        return productTypeRepository.findByTypeName(typeName);
    }

    @Override
    public ProductType addProductType(ProductType productType) {

        productTypeRepository.save(productType);
        
        return productType;
    }

   
    
    
}
