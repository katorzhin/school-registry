package com.katorzhin.schoolregistry.dto.schoolDto;

import com.katorzhin.schoolregistry.model.SchoolType;

public record SchoolDtoRequest(
        String name,
        String edrpou,
        String region,
        SchoolType type
) {}