package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Equipments;

@Repository
public interface EquipmentsRepository extends JpaRepository<Equipments, Integer> {

	List<Equipments> findByName(String Name);
}
