package com.katorzhin.schoolregistry.spec;

import com.katorzhin.schoolregistry.model.School;
import com.katorzhin.schoolregistry.model.SchoolType;
import org.springframework.data.jpa.domain.Specification;

public class SchoolSpecification {

    public static Specification<School> hasRegion(String region) {
        return (root, query, cb) -> {
            if (region == null || region.isEmpty()) return cb.conjunction();
            return cb.like(cb.lower(root.get("region")), region.toLowerCase() + "%");
        };
    }

    public static Specification<School> hasType(SchoolType type) {
        return (root, query, cb) ->
                type == null ? null : cb.equal(root.get("type"), type);
    }

    public static Specification<School> isActive(Boolean active) {
        return (root, query, cb) ->
                active == null ? null : cb.equal(root.get("isActive"), active);
    }
}
