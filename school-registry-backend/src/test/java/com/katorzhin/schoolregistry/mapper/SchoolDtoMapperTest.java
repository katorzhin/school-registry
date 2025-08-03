package com.katorzhin.schoolregistry.mapper;

import com.katorzhin.schoolregistry.dto.schoolDto.SchoolDtoRequest;
import com.katorzhin.schoolregistry.dto.schoolDto.SchoolDtoResponse;
import com.katorzhin.schoolregistry.model.School;
import com.katorzhin.schoolregistry.model.SchoolType;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class SchoolDtoMapperTest {

    private final SchoolDtoMapper mapper = Mappers.getMapper(SchoolDtoMapper.class);

    @Test
    void toEntity_ShouldMapRequestToEntity() {
        // given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "Test School",
                "12345678",
                "Poltava",
                SchoolType.ZZSO
        );

        // when
        School result = mapper.toEntity(request);

        // then
        assertNotNull(result);
        assertNull(result.getId());
        assertTrue(result.isActive());
        assertEquals("Test School", result.getName());
        assertEquals("12345678", result.getEdrpou());
        assertEquals("Poltava", result.getRegion());
        assertEquals(SchoolType.ZZSO, result.getType());
    }

    @Test
    void toResponse_ShouldMapEntityToResponse() {
        // given
        School school = new School();
        UUID id = UUID.randomUUID();
        school.setId(id);
        school.setName("Test");
        school.setEdrpou("87654321");
        school.setRegion("Kyiv");
        school.setType(SchoolType.GYMNASIUM);
        school.setActive(false);

        // when
        SchoolDtoResponse result = mapper.toResponse(school);

        // then
        assertNotNull(result);
        assertEquals(id, result.id());
        assertEquals("Test", result.name());
        assertEquals("87654321", result.edrpou());
        assertEquals("Kyiv", result.region());
        assertEquals(SchoolType.GYMNASIUM, result.type());
        assertFalse(result.active());
    }
}