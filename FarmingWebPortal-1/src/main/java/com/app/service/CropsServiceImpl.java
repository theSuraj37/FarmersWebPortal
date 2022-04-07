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

import com.app.dto.CropResponseDto;
import com.app.pojos.Crops;
import com.app.repository.CropsRepositoy;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Transactional
public class CropsServiceImpl implements ICropsService {

	private static String location = System.getProperty("user.dir") + "/src/main/resources/static/images/crops";

	@Autowired
	private CropsRepositoy cropsRepo;

	// get all crops functionality
	@Override
	public List<CropResponseDto> getAllCrops() {
		
		List<Crops> cropsList = cropsRepo.findAll();

		List<CropResponseDto> cropsDto = new ArrayList<CropResponseDto>();

		cropsList.forEach(p -> {
			CropResponseDto crop = new CropResponseDto();

			crop.setId(p.getId());
			crop.setName(p.getName());
			crop.setImg(p.getImg());
			crop.setDescr(p.getDescr());
			crop.setSeason(p.getSeason());

			Path path = Paths.get(location, p.getImg());

			try {
				crop.setData(Files.readAllBytes(path));
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				crop.setType(Files.probeContentType(path));
			} catch (IOException e) {
				e.printStackTrace();
			}
			cropsDto.add(crop);
		});
		return cropsDto;

	}

	// get crops by id functionality
	@Override
	public CropResponseDto getCropById(int id) throws IOException {

		CropResponseDto cropdto = new CropResponseDto();
		Crops crop = cropsRepo.findById(id).get();
		System.out.println(crop.toString());

		cropdto.setId(crop.getId());
		cropdto.setName(crop.getName());
		cropdto.setDescr(crop.getDescr());
		cropdto.setSeason(crop.getSeason());

		Path path = Paths.get(location, crop.getImg());
		
		cropdto.setImg(crop.getImg());
		cropdto.setData(Files.readAllBytes(path));
		cropdto.setType(Files.probeContentType(path));
		return cropdto;
	}

	// search crops by name functionality
	@Override
	public List<CropResponseDto> searchByName(String name) throws IOException {
	
		List<Crops> cropList = cropsRepo.findByName(name);
		List<CropResponseDto> cropDto = new ArrayList<CropResponseDto>();

		cropList.forEach(p -> {

			CropResponseDto cropdto = new CropResponseDto();
			cropdto.setId(p.getId());
			cropdto.setName(p.getName());
			cropdto.setDescr(p.getDescr());
			cropdto.setSeason(p.getSeason());

			Path path = Paths.get(location, p.getImg());
			cropdto.setImg(p.getImg());

			try {
				cropdto.setData(Files.readAllBytes(path));
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				cropdto.setType(Files.probeContentType(path));
			} catch (IOException e) {
				e.printStackTrace();
			}

			cropDto.add(cropdto);

		});
		return cropDto;
	}

	// add crops functionality
	@Override
	public Crops addCrops(String crop, MultipartFile file) throws IOException {

		System.out.println(crop);
		Crops crops = new Crops();

		Crops pCrops = new ObjectMapper().readValue(crop, Crops.class);

		crops.setName(pCrops.getName());
		crops.setDescr(pCrops.getDescr());
		crops.setSeason(pCrops.getSeason());
		crops.setImg(file.getOriginalFilename());

		String imageUID;
		if (!file.isEmpty()) {
			imageUID = file.getOriginalFilename();
			Path fileNameAndPath = Paths.get(location, imageUID);
			Files.write(fileNameAndPath, file.getBytes());
		} else {
			imageUID = file.getOriginalFilename();
		}

		return cropsRepo.save(crops);
	}

	// update crops functionality
	@Override
	public Crops updateCrops(int id, String cropsDto, MultipartFile file) throws IOException {
		
		Crops crop = cropsRepo.findById(id).get();
		
		CropResponseDto cData = new ObjectMapper().readValue(cropsDto, CropResponseDto.class);

		crop.setId(crop.getId());
		crop.setName(cData.getName());
		crop.setDescr(cData.getDescr());
		crop.setSeason(cData.getSeason());

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
		crop.setImg(imageUUID);
		System.out.println(cData.toString());

		return cropsRepo.save(crop);

	}

}
