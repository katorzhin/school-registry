package com.katorzhin.schoolregistry.service;

import com.katorzhin.schoolregistry.dto.schoolDto.SchoolDtoRequest;
import com.katorzhin.schoolregistry.dto.schoolDto.SchoolDtoResponse;
import com.katorzhin.schoolregistry.exception.SchoolNotFoundException;
import com.katorzhin.schoolregistry.mapper.SchoolDtoMapper;
import com.katorzhin.schoolregistry.model.School;
import com.katorzhin.schoolregistry.model.SchoolType;
import com.katorzhin.schoolregistry.repository.SchoolRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class SchoolServiceTest {

    @Mock
    private SchoolRepository schoolRepository;

    @Mock
    private SchoolDtoMapper schoolDtoMapper;

    @InjectMocks
    private SchoolService schoolService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void create_ShouldSaveAndReturnSchool() {
        // given
        SchoolDtoRequest request =
                new SchoolDtoRequest(
                        "School A",
                        "12345678",
                        "Kharkiv",
                        SchoolType.LYCEUM);
        School school = new School();
        school.setName("School A");

        School savedSchool = new School();
        savedSchool.setId(UUID.randomUUID());
        savedSchool.setName("School A");

        SchoolDtoResponse response =
                new SchoolDtoResponse(
                        savedSchool.getId(),
                        "School A",
                        "12345678",
                        "Kharkiv",
                        SchoolType.LYCEUM,
                        true);

        when(schoolDtoMapper.toEntity(request)).thenReturn(school);
        when(schoolRepository.save(school)).thenReturn(savedSchool);
        when(schoolDtoMapper.toResponse(savedSchool)).thenReturn(response);

        // when
        SchoolDtoResponse result = schoolService.create(request);

        // then
        assertEquals("School A", result.name());
        verify(schoolRepository).save(school);
    }

    @Test
    void deactivateSchool_ShouldSetInactiveAndSave() {
        // given
        UUID id = UUID.randomUUID();
        School school = new School();
        school.setId(id);
        school.setActive(true);

        when(schoolRepository.findById(id)).thenReturn(Optional.of(school));

        // when
        schoolService.deactivateSchool(id);

        // then
        assertFalse(school.isActive());
        verify(schoolRepository).save(school);
    }

    @Test
    void deactivateSchool_ShouldThrowIfNotFound() {
        UUID id = UUID.randomUUID();
        when(schoolRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(SchoolNotFoundException.class, () -> schoolService.deactivateSchool(id));
    }

    @Test
    void findAllFiltered_ShouldReturnMappedResults() {
        // given
        Pageable pageable = PageRequest.of(0, 10);
        School school = new School();
        school.setId(UUID.randomUUID());
        school.setName("Test");
        school.setEdrpou("12345678");
        school.setRegion("Kharkiv");
        school.setType(SchoolType.LYCEUM);
        school.setActive(true);

        Page<School> schoolPage = new PageImpl<>(java.util.List.of(school));
        when(schoolRepository.findAll(any(Specification.class), eq(pageable)))
                .thenReturn(schoolPage);

        SchoolDtoResponse dto =
                new SchoolDtoResponse(school.getId(),
                        "Test",
                        "12345678",
                        "Kharkiv",
                        SchoolType.LYCEUM,
                        true);
        when(schoolDtoMapper.toResponse(school)).thenReturn(dto);

        // when
        Page<SchoolDtoResponse> result =
                schoolService.findAllFiltered(
                        "Kharkiv",
                        SchoolType.LYCEUM,
                        true,
                        pageable);

        // then
        assertEquals(1, result.getTotalElements());
        assertEquals("Test", result.getContent().get(0).name());
    }
}