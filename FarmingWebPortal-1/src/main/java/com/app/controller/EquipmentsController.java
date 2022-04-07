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
import com.app.pojos.Equipments;
import com.app.repository.EquipmentsRepository;
import com.app.service.EquipmentsServiceImpl;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
public class EquipmentsController {

	@Autowired
	private EquipmentsServiceImpl equipService;

	@Autowired
	private EquipmentsRepository equipRepo;

	// default constructor
	public EquipmentsController() {
		System.out.println("in ctor of " + getClass());
	}

	// get all equipments REST API
	@RequestMapping(value = "/api/equipments", method = RequestMethod.GET)
	public ResponseEntity<?> getAllEquipments() {

		return new ResponseEntity<>(equipService.getAllEquipments(), HttpStatus.OK);
	}

	// add equipment REST API
	@RequestMapping(value = "/api/equipments/getall/addequipments", method = RequestMethod.POST)
	public ResponseEntity<?> addEquipments(@RequestParam("equipmentdata") String equips,
			@RequestParam("EquipmentImage") MultipartFile file) throws IOException {

		return new ResponseEntity<>(equipService.addEquipments(equips, file), HttpStatus.OK);
	}

	// get equipments by id REST API
	@RequestMapping(value = "/api/equipments/getall/getequipmentsbyid/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getEquipmentById(@PathVariable int id) throws IOException {

		return new ResponseEntity<>(equipService.getEquipmentById(id), HttpStatus.OK);
	}

	// search equipment by id REST API
	@RequestMapping(value = "/api/equipments/searchByName/{name}", method = RequestMethod.GET)
	public ResponseEntity<?> searchByName(@PathVariable String name) throws IOException {

		return new ResponseEntity<>(equipService.searchByName(name), HttpStatus.OK);
	}

	// update equipments REST API
	@RequestMapping(value = "/api/equipments/getall/updateequipment/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateEquipment(@RequestParam("EquipDto") String equipdto,
			@RequestParam("equipImg") MultipartFile file, @PathVariable int id) throws IOException {

		System.out.println(equipdto);
		return new ResponseEntity<>(equipService.updateEquipments(id, equipdto, file), HttpStatus.OK);
	}

	// delete equipment REST API
	@RequestMapping(value = "/api/equipment/getall/deleteequipment/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Crops> deleteEquipment(@PathVariable int id) {

		// get equipment by id
		Equipments equip = equipRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Equipment not exist."));

		// delete selected equipment
		equipRepo.delete(equip);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}