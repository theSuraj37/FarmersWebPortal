package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.pojos.Equipments;
import com.app.dto.EquipmentResponeDto;

public interface IEquipmentsService {

	public List<EquipmentResponeDto> getAllEquipments();
	
	public Equipments addEquipments(String equip, MultipartFile file)throws IOException;
	
	public EquipmentResponeDto getEquipmentById(int id) throws IOException;
	
	public Equipments updateEquipments(int id, String equipDto, MultipartFile file) throws IOException;
	
	public List<EquipmentResponeDto> searchByName(String name) throws IOException;
}
