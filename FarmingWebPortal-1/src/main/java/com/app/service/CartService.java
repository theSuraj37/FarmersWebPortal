package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.AddToCartDto;
import com.app.dto.CartDto;
import com.app.dto.CartItemDto;
import com.app.pojos.Cart;
import com.app.pojos.Products;
import com.app.pojos.User;
import com.app.repository.CartRepository;
import com.app.repository.ProductsRepository;

@Service
public class CartService {

	@Autowired
	ProductsServiceImpl productservice;

	@Autowired
	CartRepository cartRepo;

	@Autowired
	ProductsRepository prodRepo;

	// add to cart functionality
	public void addToCart(AddToCartDto addToCartDto, User user) {

		//get product details
		Products product = productservice.findById(addToCartDto.getProduct_id());

		//create object of Cart
		Cart cart = new Cart();

		//set values to cart
		cart.setProduct(product);
		cart.setUser(user);
		cart.setQty(addToCartDto.getQty());

		cartRepo.save(cart);
	}

	// list cart items functionality
	public CartDto listcartItems(User user) {
		
		List<Cart> cartList = cartRepo.findByUser(user);

		List<CartItemDto> cartItems = new ArrayList<>();
		float totalcost = 0;

		for (Cart cart : cartList) {
			CartItemDto cartItemDto = new CartItemDto(cart); // id qunatity product----->getprice

			totalcost += cartItemDto.getQuantity() * cart.getProduct().getPrice();

			cartItems.add(cartItemDto);
		}

		System.out.println(totalcost);
		CartDto cartDto = new CartDto();// final object that we have to pass--->FE
		cartDto.setTotalcost(totalcost); // set total price
		cartDto.setCartItems(cartItems);

		return cartDto;
	}

	// delete cart items functionality
	public void deletCartItem(Integer itemId, User user) {
		
			cartRepo.deleteById(itemId);
	}

	// get cart items by id functionality
	public CartItemDto getCartItemByID(int id) {
		
		CartItemDto cartItemDto = new CartItemDto();
		Cart cart = cartRepo.findById(id).get();
		
		cartItemDto.setId(cart.getId());
		cartItemDto.setProduct(cart.getProduct());
		cartItemDto.setQuantity(cart.getQty());
		return cartItemDto;
	}

	// update cart items functionality
	public String updatecart(int id, int quantity, int pid, User user) {

		Cart cart = cartRepo.findById(id).get();
		
		int id1 = cart.getProduct().getProdId();
		
		Products product = prodRepo.findById(id1).get();

		int pquantity = product.getQty();

		// user selected quantity should be less than or equal to product q
		if (quantity <= pquantity) {
			cart.setQty(quantity);
			cart.setProduct(product);
			cart.setUser(user);
			cartRepo.save(cart);
			return "Quantity updated sucessfully !!";
		} else {
			return "Quantity should be less than " + pquantity;
		}
	}
	
	// remove all items of user functionality
	public CartDto removeAllItemsOfUser(User user) {
		
		List<Cart> cartList = cartRepo.findByUser(user);
		
		List<CartItemDto> cartItems = new ArrayList<>();
		
		CartDto cartDto = new CartDto();
		for (Cart cart : cartList) {
			CartItemDto cartItemDto = new CartItemDto(cart);

			cartItems.add(cartItemDto);

			cartRepo.deleteById(cart.getId());

		}

		cartDto.setCartItems(cartItems);
		return cartDto;
	}

}
