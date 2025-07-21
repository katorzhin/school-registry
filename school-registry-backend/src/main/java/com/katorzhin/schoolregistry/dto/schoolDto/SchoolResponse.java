package com.katorzhin.schoolregistry.dto.schoolDto;

import com.katorzhin.schoolregistry.model.SchoolType;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class SchoolResponse {
    private UUID id;
    private String name;
    private String edrpou;
    private String region;
    private SchoolType type;
    private boolean active;
}