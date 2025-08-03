package com.katorzhin.schoolregistry.exception;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GlobalExceptionHandlerTest {

    @InjectMocks
    private GlobalExceptionHandler exceptionHandler;

    MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup()
                .setControllerAdvice(exceptionHandler)
                .build();
    }

    @Test
    void handleSchoolNotFound_ShouldReturnCorrectProblemDetail() {
        // Given
        String message = "School with id " + UUID.randomUUID() + " not found";
        SchoolNotFoundException exception = new SchoolNotFoundException(message);

        // When
        ProblemDetail result = exceptionHandler.handleSchoolNotFound(exception);

        // Then
        assertNotNull(result);
        assertEquals(HttpStatus.NOT_FOUND.value(), result.getStatus());
        assertEquals("School Not Found", result.getTitle());
        assertEquals(message, result.getDetail());
        assertEquals("/schools", result.getInstance().toString());
    }

    @Test
    void handleInvalidUUID_ShouldReturnCorrectProblemDetail() {
        // Given
        String invalidValue = "invalid-uuid";
        MethodArgumentTypeMismatchException exception = mock(MethodArgumentTypeMismatchException.class);
        when(exception.getValue()).thenReturn(invalidValue);

        // When
        ProblemDetail result = exceptionHandler.handleInvalidUUID(exception);

        // Then
        assertNotNull(result);
        assertEquals(HttpStatus.BAD_REQUEST.value(), result.getStatus());
        assertEquals("Invalid Request Parameter", result.getTitle());
        assertEquals("Invalid UUID format in URL: " + invalidValue, result.getDetail());
        assertEquals("/schools", result.getInstance().toString());
    }

    @Test
    void handleValidationErrors_ShouldReturnCorrectProblemDetail() {
        // Given
        MethodArgumentNotValidException exception = mock(MethodArgumentNotValidException.class);
        BindingResult bindingResult = mock(BindingResult.class);

        List<FieldError> fieldErrors = Arrays.asList(
                new FieldError("schoolDtoRequest", "name", "Name is required"),
                new FieldError("schoolDtoRequest", "edrpou", "EDRPOU must be exactly 8 digits"),
                new FieldError("schoolDtoRequest", "name", "Name cannot be blank")
        );

        when(exception.getBindingResult()).thenReturn(bindingResult);
        when(bindingResult.getFieldErrors()).thenReturn(fieldErrors);

        // When
        ProblemDetail result = exceptionHandler.handleValidationErrors(exception);

        // Then
        assertNotNull(result);
        assertEquals(HttpStatus.BAD_REQUEST.value(), result.getStatus());
        assertEquals("Validation Failed", result.getTitle());
        assertEquals("One or more fields are invalid", result.getDetail());
        assertEquals("/schools", result.getInstance().toString());

        @SuppressWarnings("unchecked")
        var errors = (java.util.Map<String, List<String>>) result.getProperties().get("errors");
        assertNotNull(errors);
        assertEquals(2, errors.size());
        assertTrue(errors.containsKey("name"));
        assertTrue(errors.containsKey("edrpou"));
        assertEquals(2, errors.get("name").size());
        assertEquals(1, errors.get("edrpou").size());
    }

    @Test
    void handleInvalidEnum_ShouldReturnCorrectProblemDetail() {
        // Given
        HttpMessageNotReadableException exception = mock(HttpMessageNotReadableException.class);
        Throwable cause = mock(Throwable.class);
        when(exception.getMostSpecificCause()).thenReturn(cause);
        when(cause.getMessage()).thenReturn("Invalid enum value");

        // When
        ProblemDetail result = exceptionHandler.handleInvalidEnum(exception);

        // Then
        assertNotNull(result);
        assertEquals(HttpStatus.BAD_REQUEST.value(), result.getStatus());
        assertEquals("Malformed JSON or Invalid Enum", result.getTitle());
        assertEquals("Invalid input: Invalid enum value", result.getDetail());
        assertEquals("/schools", result.getInstance().toString());
    }

    @Test
    void handleSchoolNotFound_WithNullMessage_ShouldHandleGracefully() {
        // Given
        SchoolNotFoundException exception = new SchoolNotFoundException(null);

        // When
        ProblemDetail result = exceptionHandler.handleSchoolNotFound(exception);

        // Then
        assertNotNull(result);
        assertEquals(HttpStatus.NOT_FOUND.value(), result.getStatus());
        assertEquals("School Not Found", result.getTitle());
        assertNull(result.getDetail());
    }

    @Test
    void handleValidationErrors_WithEmptyFieldErrors_ShouldReturnCorrectProblemDetail() {
        // Given
        MethodArgumentNotValidException exception = mock(MethodArgumentNotValidException.class);
        BindingResult bindingResult = mock(BindingResult.class);

        when(exception.getBindingResult()).thenReturn(bindingResult);
        when(bindingResult.getFieldErrors()).thenReturn(List.of());

        // When
        ProblemDetail result = exceptionHandler.handleValidationErrors(exception);

        // Then
        assertNotNull(result);
        assertEquals(HttpStatus.BAD_REQUEST.value(), result.getStatus());
        assertEquals("Validation Failed", result.getTitle());
        assertEquals("One or more fields are invalid", result.getDetail());

        @SuppressWarnings("unchecked")
        var errors = (java.util.Map<String, List<String>>) result.getProperties().get("errors");
        assertNotNull(errors);
        assertTrue(errors.isEmpty());
    }
}