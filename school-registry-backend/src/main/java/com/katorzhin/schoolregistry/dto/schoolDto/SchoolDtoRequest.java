package com.katorzhin.schoolregistry.dto.schoolDto;

import com.katorzhin.schoolregistry.model.SchoolType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record SchoolDtoRequest(
        @NotBlank(message = "Name is required")
        String name,
        @NotBlank(message = "EDRPOU is required")
        @Pattern(regexp = "\\d{8}", message = "EDRPOU must be exactly 8 digits")
        String edrpou,
        @NotBlank(message = "Region is required")
        String region,
        @NotNull
        SchoolType type
) {}