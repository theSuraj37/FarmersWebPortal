package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.UserResponseDto;
import com.app.pojos.User;
import com.app.repository.UserRepository;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository userrepo;
	
	//get all users details functionality
	public List<UserResponseDto> getAllUserDetails(){
		
		List<User> list = userrepo.getAllUserDetails();
		List<UserResponseDto> resplist = new ArrayList<UserResponseDto>();
		
		for(User user : list) {
			UserResponseDto response = new UserResponseDto();
			response.setId(user.getId());
			response.setEmail(user.getEmail());
			response.setUsername(user.getUsername());
			
			resplist.add(response);
		}
		
		return resplist;
	}
}
