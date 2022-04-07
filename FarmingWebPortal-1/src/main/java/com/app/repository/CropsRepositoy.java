package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Crops;

@Repository
public interface CropsRepositoy extends JpaRepository<Crops, Integer> {

	List<Crops> findByName(String Name);
}
