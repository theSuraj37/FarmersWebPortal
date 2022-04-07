package com.app.dto;

public class OrderDto {

	private	String name;
	private	String email;
	private String mobileno;
	private String address;
	private String city;
	private String zipcode;
	private String state;
	private String paymentmode;
	private float price;

	
	public OrderDto()
	{
		
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getMobileno() {
		return mobileno;
	}


	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
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


	public String getPaymentmode() {
		return paymentmode;
	}


	public void setPaymentmode(String paymentmode) {
		this.paymentmode = paymentmode;
	}


	public float getPrice() {
		return price;
	}


	public void setPrice(float price) {
		this.price = price;
	}


	public OrderDto(String name, String email, String mobileno, String address, String city, String zipcode,
			String state, String paymentmode, float price) {
		super();
		this.name = name;
		this.email = email;
		this.mobileno = mobileno;
		this.address = address;
		this.city = city;
		this.zipcode = zipcode;
		this.state = state;
		this.paymentmode = paymentmode;
		this.price = price;
	}
	
	
}
