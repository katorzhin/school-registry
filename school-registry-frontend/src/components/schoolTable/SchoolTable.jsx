import {
    TableContainer, Paper, Table, TableHead, TableRow, TableBody, Box, Button, TableCell, Alert, Snackbar,
} from '@mui/material';

import Filters from "../filters/Filters.jsx";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog.jsx";
import SchoolRow from "../schoolRow/SchoolRow.jsx";
import SchoolForm from "../schoolForm/SchoolForm.jsx";
import {useSchoolTable} from './useSchoolTable.js';
import {styles} from './styles.js';
import {useState} from "react";
import {Pagination} from '@mui/material';
import TableSortableCell from "../tableSorting/TableSortableCell.jsx";

const SchoolTable = () => {
    const {
        schools,
        filters,
        formOpen,
        dialogOpen,
        handleFilterChange,
        setFormOpen,
        handleDeactivate,
        confirmDeactivate,
        setDialogOpen,
        loadSchools,
        pagination,
        setPagination,
        sortField,
        sortDirection,
        handleSort,
    } = useSchoolTable();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({open: true, message, severity});
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));
    };

    return (

        <Box sx={styles.container}>
            <Box sx={styles.headerRow}>
                <Filters
                    filters={filters}
                    onChange={handleFilterChange}/>
                <Button variant="contained" onClick={() => setFormOpen(true)}>
                    Створити
                </Button>
            </Box>
            <SchoolForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSuccess={async () => {
                    await loadSchools();
                    showSnackbar('Школу успішно створено!');
                }}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={styles.tableHeadRow}>
                            <TableSortableCell field="name"
                                               label="Назва"
                                               sortField={sortField}
                                               sortDirection={sortDirection}
                                               onSort={handleSort}/>
                            <TableCell>ЄДРПОУ</TableCell>
                            <TableSortableCell field="region"
                                               label="Область"
                                               sortField={sortField}
                                               sortDirection={sortDirection}
                                               onSort={handleSort}/>
                            <TableSortableCell field="type"
                                               label="Тип"
                                               sortField={sortField}
                                               sortDirection={sortDirection}
                                               onSort={handleSort}/>
                            <TableCell>Активна</TableCell>
                            <TableCell>Дія</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schools.map((s) => (
                            <SchoolRow key={s.id} school={s} onDeactivate={handleDeactivate}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" my={2}>
                <Pagination
                    count={pagination.totalPages}
                    page={pagination.page + 1}
                    onChange={(_, value) => {
                        setPagination((prev) => ({...prev, page: value - 1}));
                    }}
                    color="primary"
                />
            </Box>

            <Box textAlign="center" mb={2}>
                {pagination.totalElements === 0 ? (
                    '0 записів'
                ) : (
                    `${pagination.page * pagination.size + 1} – ${Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)} з ${pagination.totalElements}`
                )}
            </Box>

            <ConfirmationDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={async () => {
                    try {
                        await confirmDeactivate();
                        showSnackbar('Школу деактивовано', 'info');
                    } catch (error) {
                        let message = 'Не вдалося деактивувати школу';

                        const data = await error.response?.json?.().catch(() => null);
                        if (data?.detail) message = data.detail;

                        showSnackbar(message, 'error');
                    } finally {
                        setDialogOpen(false);
                    }
                }}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{width: '100%'}}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SchoolTable;
