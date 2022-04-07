package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.CropResponseDto;
import com.app.pojos.Crops;

public interface ICropsService {

	public List<CropResponseDto> getAllCrops();

	public Crops addCrops(String crop, MultipartFile file) throws IOException;

	public CropResponseDto getCropById(int id) throws IOException;

	public Crops updateCrops(int id, String cropsDto, MultipartFile file) throws IOException;

	public List<CropResponseDto> searchByName(String name) throws IOException;
}
