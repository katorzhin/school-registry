package com.katorzhin.schoolregistry.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum SchoolType {
    GYMNASIUM("Гімназія"),
    LYCEUM("Ліцей"),
    ZZSO("Заклад загальної середньої освіти");

    private final String description;

    SchoolType(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }

    @JsonCreator
    public static SchoolType fromValue(String value) {
        for (SchoolType type : values()) {
            if (type.name().equalsIgnoreCase(value) || type.description.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown type: " + value);
    }
}
