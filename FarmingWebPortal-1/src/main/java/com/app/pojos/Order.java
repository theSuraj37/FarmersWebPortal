package com.app.pojos;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="order_details")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private	Integer id;
	
	private String username;
	private String address;
	private String mobileNo;
	private String email;
	private String city;
	private String zipcode;
	private String state;
	private float totalprice;
	@Enumerated(EnumType.STRING)
	private PaymentType  payType;
	
	@ManyToOne
	private User user;
	
	@Column(name = "order_date")
	private LocalDateTime placeorderdate;
	
	public Order()
	{
		
	}

	


	public Order(Integer id, String username, String address, String mobileNo, String email, String city,
			String zipcode, String state, float totalprice, PaymentType payType, 
			 User user, LocalDateTime placeorderdate) {
		super();
		this.id = id;
		this.username = username;
		this.address = address;
		this.mobileNo = mobileNo;
		this.email = email;
		this.city = city;
		this.zipcode = zipcode;
		this.state = state;
		this.totalprice = totalprice;
		this.payType = payType;
		this.user = user;
		this.placeorderdate = placeorderdate;
	}








	public PaymentType getPayType() {
		return payType;
	}

	public void setPayType(PaymentType payType) {
		this.payType = payType;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public float getTotalprice() {
		return totalprice;
	}

	public void setTotalprice(float totalprice) {
		this.totalprice = totalprice;
	}

	public User getUser() {
		return user;
	}

	public void setCustomer(User user) {
		this.user = user;
	}

	public LocalDateTime getPlaceorderdate() {
		return placeorderdate;
	}

	public void setPlaceorderdate(LocalDateTime placeorderdate) {
		this.placeorderdate = placeorderdate;
	}

}
