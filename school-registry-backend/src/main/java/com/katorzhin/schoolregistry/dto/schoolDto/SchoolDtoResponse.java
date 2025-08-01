package com.katorzhin.schoolregistry.dto.schoolDto;

import com.katorzhin.schoolregistry.model.SchoolType;

import java.util.UUID;

public record SchoolDtoResponse(
        UUID id,
        String name,
        String edrpou,
        String region,
        SchoolType type,
        boolean active) {}