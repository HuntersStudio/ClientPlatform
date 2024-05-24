package com.consumer_service.consumer_service.controller;

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

import com.consumer_service.consumer_service.Dto.ProductDto;
import com.consumer_service.consumer_service.Dto.UserDto;
import com.consumer_service.consumer_service.entity.ProductType;
import com.consumer_service.consumer_service.entity.Purchase;
import com.consumer_service.consumer_service.service.ConsumerService;

@RestController
@RequestMapping("/consumer")
public class ConsumerController {

    @Autowired
    ConsumerService consumerService;

    @GetMapping("/getProductByName/{name}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable String name) {

        ProductDto product = consumerService.getProductByName(name);

        return ResponseEntity.ok(product);
    }

    @GetMapping("/getUserByName/{name}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("name") String name) {

        UserDto userDto = consumerService.getUser(name);

        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/getUserPurchases/{name}")
    public ResponseEntity<List<Purchase>> getUserPurcahsesByName(@PathVariable("name") String name) {

        List<Purchase> purchases = consumerService.viewPurchasesByName(name);
        return ResponseEntity.ok(purchases);
    }

    @GetMapping("/getProductStockByName/{name}")
    public ResponseEntity<String> getPRoductStockByName(@PathVariable("name") String name) {

        ProductDto productDto = consumerService.getProductByName(name);
        return ResponseEntity.ok("El stock del producto " + productDto.getName() + " es " + productDto.getStock());
    }

    @PostMapping("/addProductType/{productType}")
    public ResponseEntity<String> addProductType(@PathVariable String productType) {

        consumerService.addProductType(productType);
        return ResponseEntity.ok("ProductType añadido correctamente");
    }

    @PostMapping("/updateProductStock/{id},{newStock}")
    public ResponseEntity<String> updateProductStock(@PathVariable("id") int id,
            @PathVariable("newStock") int newStock) {

        consumerService.updateProductStock(id, newStock);

        return ResponseEntity.ok("Stock actualizado correctamente");
    }

    @PostMapping("/buyProduct")
    public ResponseEntity<String> buyProduct(@RequestBody() Map<String, Object> productMap) {

        String name = (String) productMap.get("name");
        int id_product = (Integer) productMap.get("id_product");
        int quantity = (Integer) productMap.get("quantity");

        UserDto userDto = consumerService.getUser(name);
        ProductDto product = consumerService.getProduct(id_product);

        if (product.getStock() > 0 && userDto != null && quantity < product.getStock()) {
            consumerService.addPurchase(userDto.getUsername(), product.getName(), quantity);
            consumerService.updateProductStock(id_product, product.getStock() - quantity);
            return ResponseEntity.ok("Compra realizada con exito");
        }

        return ResponseEntity.badRequest().body("No queda stock de este producto");
    }

    @GetMapping("/viewProductTypes")
    public ResponseEntity<List<ProductType>> viewProductTypes() {

        return ResponseEntity.ok(consumerService.viewAllProductType());
    }
}
