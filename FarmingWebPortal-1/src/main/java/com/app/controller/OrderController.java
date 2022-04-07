package com.app.controller;

import org.springframework.security.core.Authentication;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderDto;
import com.app.dto.OrderResponseDto;
import com.app.pojos.User;
import com.app.repository.UserRepository;
import com.app.service.OrderService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/order")
public class OrderController {

	@Autowired
	private OrderService orderservice;

	@Autowired
	private UserRepository userrepo;

	// place order REST API
	@PostMapping
	public ResponseEntity<OrderResponseDto> placeOrder(@RequestBody OrderDto orderdto, Authentication auth) {

		// step1: get user details by passing user name
		User user = userrepo.findByUsername(auth.getName()).orElseThrow(() -> new RuntimeException("Please Login in "));

		return new ResponseEntity<>(orderservice.placeOrderDetails(orderdto, user), HttpStatus.CREATED);

	}

	// get customer order details REST API
	@GetMapping
	public List<OrderResponseDto> getCustomerOrderDetails(Authentication auth) {

		// step1: get user details by passing user name
		User user = userrepo.findByUsername(auth.getName()).orElseThrow(() -> new RuntimeException("Please Login in "));

		// step2: get specific user by passing id
		long id = user.getId();

		return orderservice.getCustomerDetails(id);
	}

	// get all customer order details REST API
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<OrderResponseDto> getCustomerOrderDetails() {

		return orderservice.getCustomerDetails();
	}
	
}
