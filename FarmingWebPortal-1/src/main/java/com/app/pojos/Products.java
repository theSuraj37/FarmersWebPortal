package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "products")
public class Products {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer prodId;

	@Column(length = 30)
	private String name;
	private String image;
	@Column(length = 700)
	private String descr;
	private int qty;
	private float price;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private Category category;

	public Products() {
		
	}
	
	

	public Products(Integer prodId, String name, String image, String descr, int qty, float price, Category category) {
		super();
		this.prodId = prodId;
		this.name = name;
		this.image = image;
		this.descr = descr;
		this.qty = qty;
		this.price = price;
		this.category = category;
	}



	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Integer getProdId() {
		return prodId;
	}

	public void setProdId(Integer prodId) {
		this.prodId = prodId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDescr() {
		return descr;
	}

	public void setDescr(String descr) {
		this.descr = descr;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

}