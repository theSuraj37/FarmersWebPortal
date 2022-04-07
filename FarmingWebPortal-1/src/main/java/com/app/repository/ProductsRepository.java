package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Products;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Integer> {

	List<Products> findAllByCategory_id(int id);
	List<Products> findByName(String Name);
}
