package com.katorzhin.schoolregistry.mapper;

import com.katorzhin.schoolregistry.dto.schoolDto.SchoolResponse;
import com.katorzhin.schoolregistry.model.School;
import org.springframework.stereotype.Component;

@Component
public class SchoolDtoMapper {

    public SchoolResponse toResponse(School school) {
        SchoolResponse response = new SchoolResponse();
        response.setId(school.getId());
        response.setName(school.getName());
        response.setEdrpou(school.getEdrpou());
        response.setRegion(school.getRegion());
        response.setType(school.getType());
        response.setActive(school.isActive());
        return response;
    }
}