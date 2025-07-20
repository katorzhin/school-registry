import {useCallback, useEffect, useState} from 'react';
import {fetchSchools, deactivateSchool} from '../../api';

export const useSchoolTable = () => {

    const [schools, setSchools] = useState([]);
    const [filters, setFilters] = useState({region: '', type: '', active: ''});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [formOpen, setFormOpen] = useState(false);

    const loadSchools = useCallback(async () => {
        const data = await fetchSchools(filters);
        setSchools(data);
    }, [filters]);

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
        loadSchools,
        handleFilterChange,
        handleDeactivate,
        confirmDeactivate,
    };
};

