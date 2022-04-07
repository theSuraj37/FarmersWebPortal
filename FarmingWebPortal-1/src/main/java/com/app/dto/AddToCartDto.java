package com.app.dto;

import javax.validation.constraints.NotNull;

public class AddToCartDto {

	private Integer id;
	private @NotNull Integer product_id;
	private @NotNull Integer qty;
	
	public AddToCartDto() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getProduct_id() {
		return product_id;
	}

	public void setProduct_id(Integer product_id) {
		this.product_id = product_id;
	}

	public Integer getQty() {
		return qty;
	}

	public void setQty(Integer qty) {
		this.qty = qty;
	}

	
	
	
	
}
