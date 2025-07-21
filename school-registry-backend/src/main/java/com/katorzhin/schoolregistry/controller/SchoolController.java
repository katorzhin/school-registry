package com.katorzhin.schoolregistry.controller;

import com.katorzhin.schoolregistry.dto.schoolDto.CreateSchoolRequest;
import com.katorzhin.schoolregistry.dto.schoolDto.SchoolResponse;
import com.katorzhin.schoolregistry.model.SchoolType;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.katorzhin.schoolregistry.service.SchoolService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/schools")
@RequiredArgsConstructor
public class SchoolController {

    private final SchoolService schoolService;

    @PostMapping
    public SchoolResponse create(@RequestBody CreateSchoolRequest school) {
        return schoolService.create(school);
    }

    @PatchMapping("/{id}/deactivate")
    public void deactivate(@PathVariable UUID id) {
        schoolService.deactivateSchool(id);
    }

    @GetMapping()
    public List<SchoolResponse> getFilteredSchools(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) SchoolType type,
            @RequestParam(required = false) Boolean active
    ) {
        return schoolService.findAllFiltered(region, type, active);
    }
}