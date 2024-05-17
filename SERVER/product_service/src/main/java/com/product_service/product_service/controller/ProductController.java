package com.product_service.product_service.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.product_service.product_service.dto.ProductDto;
import com.product_service.product_service.entity.Product;
import com.product_service.product_service.entity.ProductType;
import com.product_service.product_service.repository.ProductReporsitory;
import com.product_service.product_service.service.ProductService;




@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductService productService;
    @Autowired
    ProductReporsitory productReporsitory;

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<Product>> getAll(){
        
        List<Product> users = productService.getAll();

        if(users.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(users);
    }

    @GetMapping("/getAllProductTypes")
    public List<ProductType> getAllProductTypes() {
      
        List<ProductType> productTypes = productService.viewProductType();
      
        return productTypes;
    }

    @GetMapping("/getProductByName/{name}")
    public ProductDto getProductByName(@PathVariable("name") String param) {

        ProductDto product = productService.getProductByName(param);

        return product;
    }
    
    
    @GetMapping("/getProductById/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable("id") int id){
        
        ProductDto product = productService.getProductByID(id);

        if(product==null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(product);
    }


    @PostMapping("/addProduct")
    public ResponseEntity<Product> save(@RequestBody() Map<String, Object> productMap){

       String name = (String) productMap.get("name");
        String description = (String) productMap.get("description");
        int price = (Integer) productMap.get("price");
        int stock =(Integer) productMap.get("Stock");
        String productType = (String) productMap.get("ProductType");
       
        ProductType pt = productService.getTypeByName(productType);


        Product product = new Product(name,description,price,stock,pt);

    productService.save(product);
    return  ResponseEntity.ok(product); 

    }   

    @PostMapping("/updateProduct/{id}")
    public String updateProduct(@PathVariable int id,@RequestBody() Map<String, Object> productMap) {
       
        Product existingProduct = productReporsitory.findById(id);

        
        String name = (String) productMap.get("name");
        String description = (String) productMap.get("description");
        int price = (Integer) productMap.get("price");
        int stock = (Integer) productMap.get("stock");


        existingProduct.setDescription(description);
        existingProduct.setName(name);
        existingProduct.setPrice(price);
        existingProduct.setStock(stock);

        productService.updateProduct(existingProduct);
        
        return "Producto actualizado correctamente\n"+existingProduct; 
      
    }

    @PostMapping("/deleteProductById/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        
        Product product = productReporsitory.findById(id);

        if(product == null){
            return  ResponseEntity.badRequest().body("El producto que quieres borrar no existe");
        }
        productService.deleteProduct(id);

        return ResponseEntity.ok().body("El producto con id "+id+" se borro correctamente");
        
    }

    @PostMapping("/updateProductStock/{idProduct},{newStock}")
    public ResponseEntity<Product> updateProductStock(@PathVariable("idProduct")int id,@PathVariable("newStock") int newStock){

        Product product = productReporsitory.findById(id);

        product.setStock(newStock);

        productService.save(product);

        return ResponseEntity.ok(product);
    }
    
    @GetMapping("/viewProductStock/{id}")
    public ResponseEntity<Integer> postMethodName(@PathVariable int id) {

        Product product = productReporsitory.findById(id);
        return ResponseEntity.ok(product.getStock());
    }
    
    @PostMapping("/addProductType/{productTypeName}")
    public ResponseEntity<ProductType> addProductType(@PathVariable String productTypeName) {
       
        ProductType productType = new ProductType();
        productType.setTypeName(productTypeName);
        productService.addProductType(productType);
        return ResponseEntity.ok(productType);
    }
    

    
}
