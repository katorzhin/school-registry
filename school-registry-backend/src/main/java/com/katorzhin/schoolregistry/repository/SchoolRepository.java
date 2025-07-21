package com.katorzhin.schoolregistry.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.katorzhin.schoolregistry.model.School;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface SchoolRepository extends JpaRepository<School, UUID>, JpaSpecificationExecutor<School> {}