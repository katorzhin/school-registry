package com.katorzhin.schoolregistry.mapper;

import com.katorzhin.schoolregistry.dto.schoolDto.SchoolDtoRequest;
import com.katorzhin.schoolregistry.dto.schoolDto.SchoolDtoResponse;
import com.katorzhin.schoolregistry.model.School;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SchoolDtoMapper {

    SchoolDtoResponse toResponse(School school);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "active", constant = "true")
    School toEntity(SchoolDtoRequest request);
}