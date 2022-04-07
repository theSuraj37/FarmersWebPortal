package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AddToCartDto;
import com.app.dto.CartDto;
import com.app.dto.response.MessageResponse;
import com.app.pojos.User;
import com.app.repository.UserRepository;
import com.app.service.CartService;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private CartService cartservice;

	@Autowired
	private UserRepository userrepo;

	// Add to cart REST API
	@PostMapping("/add")
	public ResponseEntity<MessageResponse> addToCart(@RequestBody AddToCartDto addToCartDto, Authentication auth) {

		// step1: get user details by passing user name
		User user = userrepo.findByUsername(auth.getName()).orElseThrow(() -> new RuntimeException("Please Login"));

		// step2: call addtoCart functionality by passing request body and user details.
		cartservice.addToCart(addToCartDto, user);

		// step3: return message response
		return new ResponseEntity<>(new MessageResponse("Product added to cart sucessfully"), HttpStatus.CREATED);
	}

	// Get Cart Items REST API
	@GetMapping("/")
	public ResponseEntity<CartDto> getCartItems(Authentication auth) {

		// step1: get user details by passing user name
		User user = userrepo.findByUsername(auth.getName()).orElseThrow(() -> new RuntimeException("Please Login in "));

		// step2: call listcartItems functionality by passing user details
		CartDto cartDto = cartservice.listcartItems(user);

		// step3: return cart details response
		return new ResponseEntity<>(cartDto, HttpStatus.OK);
	}

	// Delete Cart Item REST API
	@DeleteMapping("/delete/{cartItemId}")
	public ResponseEntity<MessageResponse> deleteCartItem(@PathVariable("cartItemId") Integer itemId,
			Authentication auth) {

		// step1: get user details by passing user name
		User user = userrepo.findByUsername(auth.getName()).orElseThrow(() -> new RuntimeException("Please Login in "));

		// step2: call deleteCartItem functionality by passing itemId and user details
		cartservice.deletCartItem(itemId, user);

		// step3: return message response
		return new ResponseEntity<>(new MessageResponse("Item has been removed"), HttpStatus.OK);
	}

	// Get Cart Details by ID REST API
	@GetMapping("{id}")
	public ResponseEntity<?> getCartDetailById(@PathVariable int id) throws IOException {

		// call getCartItemsByID functionality by passing id
		return new ResponseEntity<>(cartservice.getCartItemByID(id), HttpStatus.OK);
	}

	// Update Cart Items REST API
	@PutMapping
	public ResponseEntity<MessageResponse> UpdateProductToCart(@RequestBody AddToCartDto cartdto, Authentication auth) {

		// step1: get user details by passing user name
		User user = userrepo.findByUsername(auth.getName()).orElseThrow(() -> new RuntimeException("Please Login in "));

		// step2: get cart id
		int id = cartdto.getId();

		// step3: get update quantity
		int quantity = cartdto.getQty();

		// step4: get product id
		int pid = cartdto.getProduct_id();

		// step5: call updatecart functionality by passing id, qty, pid and user details
		String msg = cartservice.updatecart(id, quantity, pid, user);

		// step6: return message response
		return new ResponseEntity<>(new MessageResponse(msg), HttpStatus.CREATED);

	}

	// Remove All Cart Items REST API
	@DeleteMapping
	public ResponseEntity<CartDto> removeAllcartItemsByuserId(Authentication auth) {

		// step1: get user details by passing user name
		User user = userrepo.findByUsername(auth.getName()).orElseThrow(() -> new RuntimeException("Please Login in "));

		// step2: call removeAllItemsOfUser functionality by passing user details
		CartDto cartDto = cartservice.removeAllItemsOfUser(user);

		// step3: return cart details response
		return new ResponseEntity<>(cartDto, HttpStatus.OK);

	}
}
