package com.app.dto;

public class UserResponseDto {

	private long id;
	private String email;
	private String username;
	
	public UserResponseDto() {
		// TODO Auto-generated constructor stub
	}

	public UserResponseDto(String email, String username, long id) {
		super();
		this.id = id;
		this.email = email;
		this.username = username;
	}

	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
