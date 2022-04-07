package com.app.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.EquipmentResponeDto;
import com.app.pojos.Equipments;
import com.app.repository.EquipmentsRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Transactional
public class EquipmentsServiceImpl implements IEquipmentsService {

	private static String location = System.getProperty("user.dir") + "/src/main/resources/static/images/equipments";

	@Autowired
	private EquipmentsRepository equipRepo;

	// get all equipments functionality
	@Override
	public List<EquipmentResponeDto> getAllEquipments() {
		
		List<Equipments> equipList = equipRepo.findAll();

		List<EquipmentResponeDto> equipDto = new ArrayList<EquipmentResponeDto>();

		equipList.forEach(p -> {
			EquipmentResponeDto equip = new EquipmentResponeDto();

			equip.setId(p.getId());
			equip.setName(p.getName());
			equip.setImg(p.getImg());
			equip.setDescr(p.getDescr());
			equip.setPrice(p.getPrice());

			Path path = Paths.get(location, p.getImg());

			try {
				equip.setData(Files.readAllBytes(path));
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				equip.setType(Files.probeContentType(path));
			} catch (IOException e) {
				e.printStackTrace();
			}
			equipDto.add(equip);
		});
		return equipDto;

	}

	// get equipments by id functionality
	@Override
	public EquipmentResponeDto getEquipmentById(int id) throws IOException {
		
		EquipmentResponeDto equipDto = new EquipmentResponeDto();
		Equipments equip = equipRepo.findById(id).get();
		System.out.println(equip.toString());

		equipDto.setId(equip.getId());
		equipDto.setName(equip.getName());
		equipDto.setDescr(equip.getDescr());
		equipDto.setPrice(equip.getPrice());

		Path path = Paths.get(location, equip.getImg());
		System.out.println(path.toString());
		System.out.println(location);
		equipDto.setImg(equip.getImg());
		equipDto.setData(Files.readAllBytes(path));
		equipDto.setType(Files.probeContentType(path));
		return equipDto;

	}

	// search equipment by name functionality
	@Override
	public List<EquipmentResponeDto> searchByName(String name) throws IOException {
		
		List<Equipments> equipList = equipRepo.findByName(name);
		List<EquipmentResponeDto> equipDto = new ArrayList<EquipmentResponeDto>();

		equipList.forEach(p -> {
			EquipmentResponeDto equip = new EquipmentResponeDto();

			equip.setId(p.getId());
			equip.setName(p.getName());
			equip.setImg(p.getImg());
			equip.setDescr(p.getDescr());
			equip.setPrice(p.getPrice());

			Path path = Paths.get(location, p.getImg());

			try {
				// crop.setData(Base64.getEncoder().encodeToString(Files.readAllBytes(path)));
				equip.setData(Files.readAllBytes(path));
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				equip.setType(Files.probeContentType(path));
			} catch (IOException e) {
				e.printStackTrace();
			}
			equipDto.add(equip);
		});
		return equipDto;
	}

	// add equipments functionality
	@Override
	public Equipments addEquipments(String equip, MultipartFile file) throws IOException {
		
		System.out.println(equip);
		Equipments equips = new Equipments();

		Equipments pEquips = new ObjectMapper().readValue(equip, Equipments.class);

		equips.setName(pEquips.getName());
		equips.setDescr(pEquips.getDescr());
		equips.setPrice(pEquips.getPrice());
		equips.setImg(file.getOriginalFilename());

		String imageUID;
		if (!file.isEmpty()) {
			imageUID = file.getOriginalFilename();
			Path fileNameAndPath = Paths.get(location, imageUID);
			Files.write(fileNameAndPath, file.getBytes());
		} else {
			imageUID = file.getOriginalFilename();
		}

		return equipRepo.save(equips);
	}

	// update equipments functionality
	@Override
	public Equipments updateEquipments(int id, String equipsDto, MultipartFile file) throws IOException {
		
		Equipments equip = equipRepo.findById(id).get();
		System.out.println(equip.toString());

		EquipmentResponeDto cData = new ObjectMapper().readValue(equipsDto, EquipmentResponeDto.class);

		equip.setId(equip.getId());
		equip.setName(cData.getName());
		equip.setDescr(cData.getDescr());
		equip.setPrice(cData.getPrice());

		String imageUUID;
		if (!file.isEmpty()) {
			imageUUID = file.getOriginalFilename();
			Path fileNameAndPath = Paths.get(location, imageUUID);
			Files.write(fileNameAndPath, file.getBytes());
		}
		{
			imageUUID = file.getOriginalFilename();
		}
		cData.setImg(imageUUID);
		equip.setImg(imageUUID);
		System.out.println(cData.toString());

		return equipRepo.save(equip);
	}
}
