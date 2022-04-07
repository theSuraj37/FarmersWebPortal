package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ProductResponseDto;
import com.app.pojos.Products;

public interface IProductsService {
	
	public List<ProductResponseDto> getAllProducts();
	
	public Products addProducts(String product, MultipartFile file) throws IOException;

	public ProductResponseDto getProductById(int id) throws IOException;
	
	public Products updateProducts(int id, String productsDto, MultipartFile file) throws IOException;
	
	public List<ProductResponseDto> getProductsByCatId(int id);

	public List<ProductResponseDto> searchByName(String name) throws IOException;
}
