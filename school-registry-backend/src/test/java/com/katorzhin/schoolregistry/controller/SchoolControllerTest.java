package com.katorzhin.schoolregistry.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.katorzhin.schoolregistry.dto.schoolDto.SchoolDtoRequest;
import com.katorzhin.schoolregistry.dto.schoolDto.SchoolDtoResponse;
import com.katorzhin.schoolregistry.model.SchoolType;
import com.katorzhin.schoolregistry.service.SchoolService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.*;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.mockito.Mockito.*;

@WebMvcTest(SchoolController.class)
class SchoolControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SchoolService schoolService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void create_ShouldReturnCreatedSchool() throws Exception {
        SchoolDtoRequest request =
                new SchoolDtoRequest(
                        "Test school",
                        "12345678",
                        "Kharkiv",
                        SchoolType.LYCEUM);
        UUID id = UUID.randomUUID();
        SchoolDtoResponse response =
                new SchoolDtoResponse(
                        id,
                        "Test school",
                        "12345678",
                        "Kharkiv",
                        SchoolType.LYCEUM,
                        true);

        when(schoolService.create(any(SchoolDtoRequest.class))).thenReturn(response);

        mockMvc.perform(post("/schools")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.name").value("Test school"));
    }

    @Test
    void deactivate_ShouldReturnNoContent() throws Exception {
        UUID id = UUID.randomUUID();

        mockMvc.perform(patch("/schools/" + id + "/deactivate"))
                .andExpect(status().isOk());

        verify(schoolService).deactivateSchool(id);
    }

    @Test
    void getFilteredSchools_ShouldReturnPage() throws Exception {
        UUID id = UUID.randomUUID();
        SchoolDtoResponse response =
                new SchoolDtoResponse(
                        id,
                        "Test",
                        "12345678",
                        "Kharkiv",
                        SchoolType.LYCEUM,
                        true
                );
        Page<SchoolDtoResponse> page = new PageImpl<>(List.of(response), PageRequest.of(0, 20), 1);

        when(schoolService.findAllFiltered(
                eq("Kharkiv"),
                eq(SchoolType.LYCEUM),
                eq(true),
                any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/schools")
                        .param("region", "Kharkiv")
                        .param("type", "LYCEUM")
                        .param("active", "true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("Test"));
    }
}