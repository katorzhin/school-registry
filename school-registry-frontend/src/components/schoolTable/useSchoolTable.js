import {useCallback, useEffect, useState} from 'react';
import {fetchSchools, deactivateSchool} from '../../api';

export const useSchoolTable = () => {

    const [schools, setSchools] = useState([]);
    const [filters, setFilters] = useState({region: '', type: '', active: ''});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalPages: 1,
        totalElements: 0,
    });

    const loadSchools = useCallback(async () => {
        const data = await fetchSchools({
            ...filters,
            page: pagination.page,
            size: pagination.size,
            ...(sortField && { sort: `${sortField},${sortDirection}` }),
        });

        setSchools(data.content);
        setPagination((prev) => ({
            ...prev,
            totalPages: data.totalPages,
            totalElements: data.totalElements
        }));
    }, [filters, pagination.page, pagination.size, sortField, sortDirection]);

    useEffect(() => {
        (async () => {
            await loadSchools();
        })();
    }, [loadSchools]);

    const handleFilterChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    };

    const handleDeactivate = (id) => {
        setSelectedId(id);
        setDialogOpen(true);
    };
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const confirmDeactivate = async () => {
        await deactivateSchool(selectedId);
        setDialogOpen(false);
        setSelectedId(null);
        await loadSchools();
    };

    return {
        schools,
        filters,
        formOpen,
        dialogOpen,
        setFormOpen,
        setDialogOpen,
        pagination,
        setPagination,
        loadSchools,
        handleFilterChange,
        handleDeactivate,
        confirmDeactivate,
        handleSort,
        sortField,
        sortDirection,
    };
};

