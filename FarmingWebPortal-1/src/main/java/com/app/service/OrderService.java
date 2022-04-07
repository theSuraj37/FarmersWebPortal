package com.app.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.CartDto;
import com.app.dto.CartItemDto;
import com.app.dto.OrderDto;
import com.app.dto.OrderResponseDto;
import com.app.pojos.Cart;
import com.app.pojos.Order;
import com.app.pojos.PaymentType;
import com.app.pojos.User;
import com.app.repository.CartRepository;
import com.app.repository.OrderRepository;

@Service
@Transactional
public class OrderService {

	@Autowired
	private CartRepository cartrepo;

	@Autowired
	private OrderRepository orderrepo;

	@Autowired
	private CartService cartservice;

	@Autowired
	private ProductsServiceImpl service;

	// place order functionality
	public OrderResponseDto placeOrderDetails(OrderDto orderdto, User user) {
		
		List<Cart> list = cartrepo.findByUser(user); // get the user ----->cart items
		OrderResponseDto response = new OrderResponseDto();

		if (list.isEmpty()) {
			response.setMsg("Your Cart is Empty...Please add product to cart ");
			return response;
		} else {

			Order o = new Order(); // order object is created
//			o.setCart(list);
			o.setCustomer(user);

			o.setEmail(user.getEmail());
			o.setUsername(orderdto.getName());
			o.setEmail(orderdto.getEmail());
			o.setAddress(orderdto.getAddress());
			o.setMobileNo(orderdto.getMobileno());
			o.getPayType();
			o.setPayType(PaymentType.valueOf(orderdto.getPaymentmode()));
			o.setTotalprice(orderdto.getPrice());
			o.setState(orderdto.getState());
			o.setCity(orderdto.getCity());
			o.setZipcode(orderdto.getZipcode());
			o.setPlaceorderdate(LocalDateTime.now());
			orderrepo.save(o); // save the order details

			response.setAddress(o.getAddress());
			response.setEmail(o.getEmail());
			response.setMobileno(o.getMobileNo());
			response.setPaymentmode(o.getPayType().toString());
			response.setName(o.getUsername());
			response.setPrice(o.getTotalprice());
			response.setCity(o.getCity());
			response.setZipcode(o.getZipcode());
			response.setState(o.getState());
			response.setMsg("Your Order is Placed Sucessfully.....");

			// cartservice.removeAllItemsOfUser(user);
			CartDto cartDto = cartservice.listcartItems(user);
			List<CartItemDto> cartItems = cartDto.getCartItems();
			for (CartItemDto c : cartItems) {
				int userq = c.getQuantity();
				int pid = c.getProduct().getProdId();
				service.updateproductQuantity(pid, userq);
			}

			return response;
		}
	}

	// get customer details functionality
	public List<OrderResponseDto> getCustomerDetails(long id) {

		List<Order> list = orderrepo.getorderdetails(id);
		List<OrderResponseDto> resplist = new ArrayList<OrderResponseDto>(); // list of resp
		for (Order order : list) {
			OrderResponseDto response = new OrderResponseDto(); // new object
			response.setAddress(order.getAddress());
			response.setEmail(order.getEmail());
			response.setMobileno(order.getMobileNo());
			response.setPaymentmode(order.getPayType().toString());
			response.setName(order.getUsername());
			response.setPrice(order.getTotalprice());
			response.setCity(order.getCity());
			response.setZipcode(order.getZipcode());
			response.setState(order.getState());

			resplist.add(response);// add the respoonse
		}
		return resplist;
	}

	// get all order details functionality
	public List<OrderResponseDto> getCustomerDetails() {
		
		List<Order> list = orderrepo.getOrderAllDetail();
		List<OrderResponseDto> resplist = new ArrayList<OrderResponseDto>();
		for (Order order : list) {
			OrderResponseDto response = new OrderResponseDto(); // new object
			response.setAddress(order.getAddress());
			response.setEmail(order.getEmail());
			response.setMobileno(order.getMobileNo());
			response.setPaymentmode(order.getPayType().toString());
			response.setName(order.getUsername());
			response.setPrice(order.getTotalprice());
			response.setCity(order.getCity());
			response.setZipcode(order.getZipcode());
			response.setState(order.getState());

			resplist.add(response);// add the respoonse
		}
		return resplist;
	}

}
