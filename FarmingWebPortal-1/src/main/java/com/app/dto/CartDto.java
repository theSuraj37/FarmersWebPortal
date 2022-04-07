package com.app.dto;

import java.util.List;

public class CartDto {

	private List<CartItemDto> cartItems;
	private float totalcost;
	
	public CartDto() {
		
	}
	
	public CartDto(List<CartItemDto> cartItems, float totalcost) {
		super();
		this.cartItems = cartItems;
		this.totalcost = totalcost;
	}

	public List<CartItemDto> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItemDto> cartItems) {
		this.cartItems = cartItems;
	}

	public float getTotalcost() {
		return totalcost;
	}

	public void setTotalcost(float totalcost) {
		this.totalcost = totalcost;
	}
	
	
	
}
