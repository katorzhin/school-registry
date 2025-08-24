package com.katorzhin.schoolregistry.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.validation.FieldError;


import java.net.URI;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(SchoolNotFoundException.class)
    public ProblemDetail handleSchoolNotFound(SchoolNotFoundException ex) {
        ErrorCode errorCode = ErrorCode.SCHOOL_NOT_FOUND;
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        problem.setTitle(errorCode.getDefaultMessage());
        problem.setDetail(ex.getMessage());
        problem.setProperty("errorCode", errorCode.getCode());
        problem.setInstance(URI.create("/schools"));
        return problem;
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ProblemDetail handleInvalidUUID(MethodArgumentTypeMismatchException ex) {
        ErrorCode errorCode = ErrorCode.INVALID_PARAMETER;
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problem.setTitle(errorCode.getDefaultMessage());
        problem.setDetail("Invalid UUID format in URL: " + ex.getValue());
        problem.setProperty("errorCode", errorCode.getCode());
        problem.setInstance(URI.create("/schools"));
        return problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationErrors(MethodArgumentNotValidException ex) {
        ErrorCode errorCode = ErrorCode.VALIDATION_FAILED;
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problem.setTitle(errorCode.getDefaultMessage());
        problem.setDetail("One or more fields are invalid");
        problem.setProperty("errorCode", errorCode.getCode());
        problem.setInstance(URI.create("/schools"));

        Map<String, List<String>> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.groupingBy(
                        FieldError::getField,
                        Collectors.mapping(FieldError::getDefaultMessage, Collectors.toList())
                ));

        problem.setProperty("errors", errors);
        return problem;
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ProblemDetail handleInvalidEnum(HttpMessageNotReadableException ex) {
        ErrorCode errorCode = ErrorCode.MALFORMED_JSON;
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problem.setTitle(errorCode.getDefaultMessage());
        problem.setDetail("Invalid input: " + ex.getMostSpecificCause().getMessage());
        problem.setProperty("errorCode", errorCode.getCode());
        problem.setInstance(URI.create("/schools"));
        return problem;
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ProblemDetail handleBadCredentials(BadCredentialsException ex) {
        ErrorCode errorCode = ErrorCode.BAD_CREDENTIALS;
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
        problem.setTitle(errorCode.getDefaultMessage());
        problem.setDetail("Invalid username or password");
        problem.setProperty("errorCode", errorCode.getCode());
        problem.setInstance(URI.create("/auth/login"));
        return problem;
    }
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Map<String, Object>> handleApiException(ApiException ex) {
        Map<String, Object> errorBody = new HashMap<>();
        errorBody.put("timestamp", Instant.now());
        errorBody.put("code", ex.getErrorCode().getCode());
        errorBody.put("message", ex.getMessage());
        errorBody.put("error", ex.getErrorCode().name());

        return new ResponseEntity<>(errorBody, ex.getStatus());
    }
}