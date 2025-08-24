package com.katorzhin.schoolregistry.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    // === Registration / User Errors E30x ===
    USERNAME_ALREADY_EXISTS("E301", "Username already exists"),

    // === Auth Errors E32x ===
    BAD_CREDENTIALS("E320", "Bad credentials"),
    AUTHENTICATION_FAILED("E321", "Authentication failed"),

    // === School Errors E40x ===
    SCHOOL_NOT_FOUND("E400", "School not found"),
    INVALID_SCHOOL_ID("E401", "Invalid school ID"),

    // === Validation Errors E42x ===
    VALIDATION_FAILED("E420", "Validation failed"),
    MALFORMED_JSON("E421", "Malformed JSON or invalid input"),

    // === Common / Generic Errors E43x ===
    INVALID_PARAMETER("E430", "Invalid request parameter");

    private final String code;
    private final String defaultMessage;

    ErrorCode(String code, String defaultMessage) {
        this.code = code;
        this.defaultMessage = defaultMessage;
    }
}