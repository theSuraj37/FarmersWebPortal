package com.app.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ProductResponseDto;
import com.app.pojos.Products;
import com.app.repository.ProductsRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Transactional
public class ProductsServiceImpl implements IProductsService {

	private static String location = System.getProperty("user.dir") + "/src/main/resources/static/images/products";

	@Autowired
	ProductsRepository productRepo;

	// get all products functionality
	@Override
	public List<ProductResponseDto> getAllProducts() {
		
		List<Products> productList = productRepo.findAll();

		List<ProductResponseDto> productsDto = new ArrayList<ProductResponseDto>();

		productList.forEach(p -> {
			ProductResponseDto product = new ProductResponseDto();

			product.setProdId(p.getProdId());
			product.setName(p.getName());
			product.setImage(p.getImage());
			product.setDescr(p.getDescr());
			product.setQty(p.getQty());
			product.setPrice(p.getPrice());

			Path path = Paths.get(location, p.getImage());

			try {
				product.setData(Files.readAllBytes(path));
			} catch (IOException e) {
				e.printStackTrace();
			}

			try {
				product.setType(Files.probeContentType(path));
			} catch (IOException e) {
				e.printStackTrace();
			}

			productsDto.add(product);
		});
		return productsDto;
	}

	// get products by id functionality
	@Override
	public ProductResponseDto getProductById(int id) throws IOException {

		ProductResponseDto productdto = new ProductResponseDto();
		Products product = productRepo.findById(id).get();
		System.out.println(product.toString());

		productdto.setProdId(product.getProdId());
		productdto.setName(product.getName());
		productdto.setDescr(product.getDescr());
		productdto.setQty(product.getQty());
		productdto.setPrice(product.getPrice());

		Path path = Paths.get(location, product.getImage());
		System.out.println(path.toString());
		System.out.println(location);
		productdto.setImage(product.getImage());
		productdto.setData(Files.readAllBytes(path));
		productdto.setType(Files.probeContentType(path));
		return productdto;
	}

	// get products by id functionality
	@Override
	public List<ProductResponseDto> getProductsByCatId(int id) {
		
		List<Products> productList = productRepo.findAllByCategory_id(id);
		List<ProductResponseDto> productDto = new ArrayList<ProductResponseDto>();

		productList.forEach(p -> {

			ProductResponseDto productdto = new ProductResponseDto();
			productdto.setProdId(p.getProdId());
			productdto.setCategoryName(p.getCategory().getCatName());
			productdto.setName(p.getName());
			productdto.setDescr(p.getDescr());
			productdto.setQty(p.getQty());
			productdto.setPrice(p.getPrice());
			productdto.setCategoryId(p.getProdId());

			Path path = Paths.get(location, p.getImage());
			System.out.println(path.toString());
			System.out.println(location);
			productdto.setImage(p.getImage());
			try {
				productdto.setData(Files.readAllBytes(path));
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				productdto.setType(Files.probeContentType(path));
			} catch (IOException e) {
				e.printStackTrace();
			}

			productDto.add(productdto);

		});
		return productDto;
	}

	// search products by name functionality
	public List<ProductResponseDto> searchByName(String name) {
		
		List<Products> productList = productRepo.findByName(name);
		List<ProductResponseDto> productDto = new ArrayList<ProductResponseDto>();

		productList.forEach(p -> {

			ProductResponseDto productdto = new ProductResponseDto();
			productdto.setProdId(p.getProdId());
			productdto.setCategoryName(p.getCategory().getCatName());
			productdto.setName(p.getName());
			productdto.setDescr(p.getDescr());
			productdto.setQty(p.getQty());
			productdto.setPrice(p.getPrice());
			productdto.setCategoryId(p.getProdId());

			Path path = Paths.get(location, p.getImage());
			System.out.println(path.toString());
			System.out.println(location);
			productdto.setImage(p.getImage());
			try {
				productdto.setData(Files.readAllBytes(path));
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				productdto.setType(Files.probeContentType(path));
			} catch (IOException e) {
				e.printStackTrace();
			}

			productDto.add(productdto);

		});
		return productDto;
	}

	// add products functionality
	@Override
	public Products addProducts(String product, MultipartFile file) throws IOException {

		System.out.println(product);

		Products products = new Products();

		Products pProduct = new ObjectMapper().readValue(product, Products.class);

		products.setName(pProduct.getName());
		products.setDescr(pProduct.getDescr());
		products.setPrice(pProduct.getPrice());
		products.setQty(pProduct.getQty());
		products.setCategory(pProduct.getCategory());
		products.setImage(file.getOriginalFilename());

		String imageUID;
		if (!file.isEmpty()) {
			imageUID = file.getOriginalFilename();
			Path fileNameAndPath = Paths.get(location, imageUID);
			Files.write(fileNameAndPath, file.getBytes());
		} else {
			imageUID = file.getOriginalFilename();
		}

		return productRepo.save(products);
	}

	// update products functionality
	@Override
	public Products updateProducts(int id, String productsDto, MultipartFile file) throws IOException {

		Products product = productRepo.findById(id).get();
		System.out.println(product.toString());

		ProductResponseDto pData = new ObjectMapper().readValue(productsDto, ProductResponseDto.class);

		product.setProdId(product.getProdId());
		product.setName(pData.getName());
		product.setDescr(pData.getDescr());
		product.setQty(pData.getQty());
		product.setPrice(pData.getPrice());

		String imageUUID;
		if (!file.isEmpty()) {
			imageUUID = file.getOriginalFilename();
			Path fileNameAndPath = Paths.get(location, imageUUID);
			Files.write(fileNameAndPath, file.getBytes());
		}
		{
			imageUUID = file.getOriginalFilename();
		}

		pData.setImage(imageUUID);
		product.setImage(imageUUID);
		System.out.println(pData.toString());

		return productRepo.save(product);
	}

	// find by id functionality
	public Products findById(Integer product_id) {
		Optional<Products> product = productRepo.findById(product_id);

		return product.get();
	}

	// update product quantity functionality
	public void updateproductQuantity(int pid, int quantity) {
		// get the product
		Products product = productRepo.findById(pid).get();

		product.setQty(product.getQty() - quantity);
	}

}
