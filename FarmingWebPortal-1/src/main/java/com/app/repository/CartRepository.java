package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Cart;
import com.app.pojos.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

	public List<Cart> findByUser(User user);
}
