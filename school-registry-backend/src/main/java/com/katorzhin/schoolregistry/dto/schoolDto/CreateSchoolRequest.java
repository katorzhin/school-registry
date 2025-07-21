package com.katorzhin.schoolregistry.dto.schoolDto;

import com.katorzhin.schoolregistry.model.SchoolType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateSchoolRequest {
    private String name;
    private String edrpou;
    private String region;
    private SchoolType type;
}