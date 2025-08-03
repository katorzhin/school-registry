package com.katorzhin.schoolregistry.controller;

import com.katorzhin.schoolregistry.dto.schoolDto.SchoolDtoRequest;
import com.katorzhin.schoolregistry.dto.schoolDto.SchoolDtoResponse;
import com.katorzhin.schoolregistry.model.SchoolType;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import com.katorzhin.schoolregistry.service.SchoolService;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

@RestController
@RequestMapping("/schools")
@RequiredArgsConstructor
public class SchoolController {

    private final SchoolService schoolService;

    @PostMapping
    public SchoolDtoResponse create(@Valid @RequestBody SchoolDtoRequest school) {
        return schoolService.create(school);
    }

    @PatchMapping("/{id}/deactivate")
    public void deactivate(@PathVariable UUID id) {
        schoolService.deactivateSchool(id);
    }

    @GetMapping()
    public Page<SchoolDtoResponse> getFilteredSchools(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) SchoolType type,
            @RequestParam(required = false) Boolean active,
            @PageableDefault(size = 20, sort = "name") Pageable pageable
    ) {
        return schoolService.findAllFiltered(region, type, active,pageable);
    }
}