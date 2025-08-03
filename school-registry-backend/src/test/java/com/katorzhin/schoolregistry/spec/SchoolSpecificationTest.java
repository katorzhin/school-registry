package com.katorzhin.schoolregistry.spec;

import com.katorzhin.schoolregistry.model.School;
import com.katorzhin.schoolregistry.model.SchoolType;
import jakarta.persistence.criteria.*;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.springframework.data.jpa.domain.Specification;

class SchoolSpecificationTest {

    @Test
    void hasRegion_ShouldCreatePredicate() {
        // given
        String region = "Kharkiv";
        Specification<School> spec = SchoolSpecification.hasRegion(region);

        // mock Criteria API
        Root<School> root = mock(Root.class);
        CriteriaQuery<?> query = mock(CriteriaQuery.class);
        CriteriaBuilder cb = mock(CriteriaBuilder.class);
        Path<String> regionPath = mock(Path.class);
        Path<String> lowerRegionPath = mock(Path.class);
        Predicate predicate = mock(Predicate.class);

        when(root.get("region")).thenReturn((Path) regionPath);
        when(cb.lower(regionPath)).thenReturn(lowerRegionPath);
        when(cb.like(lowerRegionPath, "kharkiv%")).thenReturn(predicate);

        // when
        Predicate result = spec.toPredicate(root, query, cb);

        // then
        assertNotNull(result);
        verify(root).get("region");
        verify(cb).lower(regionPath);
        verify(cb).like(lowerRegionPath, "kharkiv%");
    }

    @Test
    void hasRegion_ShouldReturnConjunctionWhenNull() {
        Specification<School> spec = SchoolSpecification.hasRegion(null);

        Root<School> root = mock(Root.class);
        CriteriaQuery<?> query = mock(CriteriaQuery.class);
        CriteriaBuilder cb = mock(CriteriaBuilder.class);
        Predicate conjunction = mock(Predicate.class);

        when(cb.conjunction()).thenReturn(conjunction);

        Predicate result = spec.toPredicate(root, query, cb);

        assertEquals(conjunction, result);
        verify(cb).conjunction();
    }

    @Test
    void hasType_ShouldCreatePredicate() {
        Specification<School> spec = SchoolSpecification.hasType(SchoolType.LYCEUM);

        Root<School> root = mock(Root.class);
        CriteriaQuery<?> query = mock(CriteriaQuery.class);
        CriteriaBuilder cb = mock(CriteriaBuilder.class);
        Path<SchoolType> typePath = mock(Path.class);
        Predicate predicate = mock(Predicate.class);

        when(root.get("type")).thenReturn((Path) typePath);
        when(cb.equal(typePath, SchoolType.LYCEUM)).thenReturn(predicate);

        Predicate result = spec.toPredicate(root, query, cb);

        assertNotNull(result);
        verify(cb).equal(typePath, SchoolType.LYCEUM);
    }

    @Test
    void hasType_ShouldReturnNullWhenTypeIsNull() {
        Specification<School> spec = SchoolSpecification.hasType(null);
        assertNull(spec.toPredicate(null, null, null));
    }

    @Test
    void isActive_ShouldCreatePredicate() {
        Specification<School> spec = SchoolSpecification.isActive(true);

        Root<School> root = mock(Root.class);
        CriteriaQuery<?> query = mock(CriteriaQuery.class);
        CriteriaBuilder cb = mock(CriteriaBuilder.class);
        Path<Boolean> activePath = mock(Path.class);
        Predicate predicate = mock(Predicate.class);

        when(root.get("isActive")).thenReturn((Path) activePath);

        when(cb.equal(activePath, true)).thenReturn(predicate);

        Predicate result = spec.toPredicate(root, query, cb);

        assertNotNull(result);
        verify(cb).equal(activePath, true);
    }

    @Test
    void isActive_ShouldReturnNullWhenNull() {
        Specification<School> spec = SchoolSpecification.isActive(null);
        assertNull(spec.toPredicate(null, null, null));
    }
}