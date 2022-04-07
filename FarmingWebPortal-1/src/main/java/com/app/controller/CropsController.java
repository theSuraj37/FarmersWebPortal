package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.exception.ResourceNotFoundException;
import com.app.pojos.Crops;
import com.app.repository.CropsRepositoy;
import com.app.service.CropsServiceImpl;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
public class CropsController {

	@Autowired
	private CropsServiceImpl cropService;

	@Autowired
	private CropsRepositoy cropsRepo;

	// Crops Default Constructor
	public CropsController() {
		System.out.println("in ctor of " + getClass());
	}

	// Get All Crops REST API
	@RequestMapping(value = "/api/crops", method = RequestMethod.GET)
	public ResponseEntity<?> getAllCrops() {

		System.out.println("in get all crops");
		return new ResponseEntity<>(cropService.getAllCrops(), HttpStatus.OK);
	}

	// Add Crops REST API
	@RequestMapping(value = "/api/crops/getall/addcrops", method = RequestMethod.POST)
	public ResponseEntity<?> addCrops(@RequestParam("cropdata") String crops,
			@RequestParam("CropImage") MultipartFile file) throws IOException {

		return new ResponseEntity<>(cropService.addCrops(crops, file), HttpStatus.OK);
	}

	// Get Crops by ID REST API
	@RequestMapping(value = "/api/crops/getall/getcropsbyid/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getCropById(@PathVariable int id) throws IOException {

		return new ResponseEntity<>(cropService.getCropById(id), HttpStatus.OK);
	}

	// Search crops by name REST API
	@RequestMapping(value = "/api/crops/searchByName/{name}", method = RequestMethod.GET)
	public ResponseEntity<?> searchByName(@PathVariable String name) throws IOException {

		return new ResponseEntity<>(cropService.searchByName(name), HttpStatus.OK);
	}

	// update crop REST API
	@RequestMapping(value = "/api/crops/getall/updatecrop/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateCrop(@RequestParam("CropDto") String cropdto,
			@RequestParam("cropImg") MultipartFile file, @PathVariable int id) throws IOException {

		System.out.println(cropdto);
		return new ResponseEntity<>(cropService.updateCrops(id, cropdto, file), HttpStatus.OK);
	}

	// delete crop REST API
	@RequestMapping(value = "/api/crops/getall/deletecrop/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Crops> deleteCrop(@PathVariable int id) {

		// get crops details from crop id
		Crops crop = cropsRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Crop not exist."));

		// delete selected crop details
		cropsRepo.delete(crop);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
