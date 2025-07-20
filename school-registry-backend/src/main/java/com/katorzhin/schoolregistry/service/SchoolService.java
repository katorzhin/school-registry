package com.katorzhin.schoolregistry.service;

import com.katorzhin.schoolregistry.model.SchoolType;
import com.katorzhin.schoolregistry.spec.SchoolSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import com.katorzhin.schoolregistry.model.School;
import com.katorzhin.schoolregistry.repository.SchoolRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SchoolService {

    private final SchoolRepository schoolRepository;

    public School create(School school) {
        return schoolRepository.save(school);
    }

    public void deactivateSchool(UUID id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("School not found"));
        school.setActive(false);
        schoolRepository.save(school);
    }

        public List<School> findAllFiltered(String region, SchoolType type, Boolean active) {
        Specification<School> spec =
                SchoolSpecification.hasRegion(region)
                .and(SchoolSpecification.hasType(type))
                .and(SchoolSpecification.isActive(active));


        return schoolRepository.findAll(spec);
    }

}
