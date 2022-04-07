package com.app.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ProductResponseDto;
import com.app.exception.ResourceNotFoundException;
import com.app.pojos.Products;
import com.app.repository.ProductsRepository;
import com.app.service.ProductsServiceImpl;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
public class ProductsController {

	@Autowired
	private ProductsServiceImpl productService;

	@Autowired
	private ProductsRepository prodRepo;

	// default constructor
	public ProductsController() {
		System.out.println("in ctor of " + getClass());
	}

	// get all products REST API
	@RequestMapping(value = "/api/products", method = RequestMethod.GET)
	public ResponseEntity<?> getAllProducts() {
		
		return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
	}

	// get all products by category id REST API
	@GetMapping("api/products/category/{id}")
	public List<ProductResponseDto> getAllProductsByCategoryId(@PathVariable int id) {
		
		return productService.getProductsByCatId(id);
	}

	// search products by name REST API
	@RequestMapping(value = "/api/products/searchByName/{name}", method = RequestMethod.GET)
	public ResponseEntity<?> searchByName(@PathVariable String name) throws IOException {
		
		return new ResponseEntity<>(productService.searchByName(name), HttpStatus.OK);
	}

	// add products REST API
	@RequestMapping(value = "/api/products/getall/addproducts", method = RequestMethod.POST)
	public ResponseEntity<?> addProducts(@RequestParam("productdata") String product,
			@RequestParam("ProductImage") MultipartFile file) throws IOException {
		
		return new ResponseEntity<>(productService.addProducts(product, file), HttpStatus.OK);
	}

	// get products by id REST API
	@RequestMapping(value = "/api/products/getall/getproductsbyid/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getProductById(@PathVariable int id) throws IOException {
		
		return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
	}

	// update products REST API
	@RequestMapping(value = "/api/products/getall/updateproduct/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateProduct(@RequestParam("ProductDto") String productDto,
			@RequestParam("productImg") MultipartFile file, @PathVariable int id) throws IOException {
		
		System.out.println(productDto);
		return new ResponseEntity<>(productService.updateProducts(id, productDto, file), HttpStatus.OK);
	}

	// delete products REST API
	@RequestMapping(value = "/api/products/getall/deleteproduct/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Products> deleteProduct(@PathVariable int id) {
		
		//get product details by id
		Products product = prodRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not exist."));
		
		//delete specific product details
		prodRepo.delete(product);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}