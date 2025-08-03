package com.katorzhin.schoolregistry.dto;

import com.katorzhin.schoolregistry.dto.schoolDto.SchoolDtoRequest;
import com.katorzhin.schoolregistry.model.SchoolType;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class SchoolDtoRequestValidationTest {

    private static Validator validator;

    @BeforeAll
    static void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void validRequest_ShouldPassValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "Test School",
                "12345678",
                "Test Region",
                SchoolType.GYMNASIUM
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertTrue(violations.isEmpty());
    }

    @Test
    void nullName_ShouldFailValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                null,
                "12345678",
                "Test Region",
                SchoolType.GYMNASIUM
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(violation -> violation.getPropertyPath().toString().equals("name")));
    }

    @Test
    void emptyName_ShouldFailValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "",
                "12345678",
                "Test Region",
                SchoolType.GYMNASIUM
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(violation -> violation.getPropertyPath().toString().equals("name")));
    }

    @Test
    void blankName_ShouldFailValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "   ",
                "12345678",
                "Test Region",
                SchoolType.GYMNASIUM
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(violation -> violation.getPropertyPath().toString().equals("name")));
    }

    @Test
    void nullEdrpou_ShouldFailValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "Test School",
                null,
                "Test Region",
                SchoolType.GYMNASIUM
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(violation -> violation.getPropertyPath().toString().equals("edrpou")));
    }

    @Test
    void emptyEdrpou_ShouldFailValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "Test School",
                "",
                "Test Region",
                SchoolType.GYMNASIUM
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(violation -> violation.getPropertyPath().toString().equals("edrpou")));
    }

    @Test
    void invalidEdrpouFormat_ShouldFailValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "Test School",
                "1234567",
                "Test Region",
                SchoolType.GYMNASIUM
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(violation -> violation.getPropertyPath().toString().equals("edrpou")));
    }

    @Test
    void edrpouWithLetters_ShouldFailValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "Test School",
                "1234567a",
                "Test Region",
                SchoolType.GYMNASIUM
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(violation -> violation.getPropertyPath().toString().equals("edrpou")));
    }

    @Test
    void nullRegion_ShouldFailValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "Test School",
                "12345678",
                null,
                SchoolType.GYMNASIUM
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(violation -> violation.getPropertyPath().toString().equals("region")));
    }

    @Test
    void emptyRegion_ShouldFailValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "Test School",
                "12345678",
                "",
                SchoolType.GYMNASIUM
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(violation -> violation.getPropertyPath().toString().equals("region")));
    }

    @Test
    void nullType_ShouldFailValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "Test School",
                "12345678",
                "Test Region",
                null
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
                .anyMatch(violation -> violation.getPropertyPath().toString().equals("type")));
    }

    @Test
    void validEdrpouWithLeadingZeros_ShouldPassValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "Test School",
                "00000001",
                "Test Region",
                SchoolType.GYMNASIUM
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertTrue(violations.isEmpty());
    }

    @Test
    void validEdrpouWithAllNines_ShouldPassValidation() {
        // Given
        SchoolDtoRequest request = new SchoolDtoRequest(
                "Test School",
                "99999999",
                "Test Region",
                SchoolType.GYMNASIUM
        );

        // When
        Set<ConstraintViolation<SchoolDtoRequest>> violations = validator.validate(request);

        // Then
        assertTrue(violations.isEmpty());
    }

    @Test
    void allSchoolTypes_ShouldPassValidation() {
        // Given
        SchoolDtoRequest gymnasiumRequest = new SchoolDtoRequest(
                "Gymnasium",
                "12345678",
                "Test Region",
                SchoolType.GYMNASIUM
        );

        SchoolDtoRequest lyceumRequest = new SchoolDtoRequest(
                "Lyceum",
                "87654321",
                "Test Region",
                SchoolType.LYCEUM
        );

        SchoolDtoRequest schoolRequest = new SchoolDtoRequest(
                "School",
                "11111111",
                "Test Region",
                SchoolType.ZZSO
        );

        // When & Then
        assertTrue(validator.validate(gymnasiumRequest).isEmpty());
        assertTrue(validator.validate(lyceumRequest).isEmpty());
        assertTrue(validator.validate(schoolRequest).isEmpty());
    }
} 