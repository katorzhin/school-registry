package com.katorzhin.schoolregistry.service;

import com.katorzhin.schoolregistry.dto.schoolDto.CreateSchoolRequest;
import com.katorzhin.schoolregistry.dto.schoolDto.SchoolResponse;
import com.katorzhin.schoolregistry.exception.SchoolNotFoundException;
import com.katorzhin.schoolregistry.mapper.SchoolDtoMapper;
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
    private final SchoolDtoMapper schoolDtoMapper;

    public SchoolResponse create(CreateSchoolRequest request) {
        School school = new School();
        school.setName(request.getName());
        school.setEdrpou(request.getEdrpou());
        school.setRegion(request.getRegion());
        school.setType(request.getType());
        school.setActive(true);
        return schoolDtoMapper.toResponse(schoolRepository.save(school));
    }

    public void deactivateSchool(UUID id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new SchoolNotFoundException("School with id " + id + " not found"));
        school.setActive(false);
        schoolRepository.save(school);
    }

    public List<SchoolResponse> findAllFiltered(String region, SchoolType type, Boolean active) {
        Specification<School> spec =
                SchoolSpecification.hasRegion(region)
                        .and(SchoolSpecification.hasType(type))
                        .and(SchoolSpecification.isActive(active));

        return schoolRepository.findAll(spec).stream()
                .map(schoolDtoMapper::toResponse)
                .toList();
    }
}
