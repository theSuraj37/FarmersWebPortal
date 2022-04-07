package com.app.dto;

import com.app.pojos.Cart;
import com.app.pojos.Products;

public class CartItemDto {
	
	 private Integer id;
	 private Integer quantity;
	 private Products product;
	 
	 public CartItemDto(){
		 
	 }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Products getProduct() {
		return product;
	}

	public void setProduct(Products product) {
		this.product = product;
	}
	 
	public CartItemDto(Cart cart) {
		this.id = cart.getId();
		this.quantity = cart.getQty();
		this.setProduct(cart.getProduct());
	}

}
