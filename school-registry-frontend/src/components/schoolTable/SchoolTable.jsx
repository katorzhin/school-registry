import {
    TableContainer, Paper, Table, TableHead, TableRow, TableBody, Box, Button, TableCell, Alert, Snackbar,
} from '@mui/material';

import Filters from "../filters/Filters.jsx";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog.jsx";
import SchoolRow from "../schoolRow/SchoolRow.jsx";
import SchoolCreateForm from "../schoolCreateForm/SchoolCreateForm.jsx";
import {useSchoolTable} from './useSchoolTable.js';
import {styles} from './styles.js';
import {useState} from "react";
import {Pagination} from '@mui/material';
import TableSortableCell from "../tableSorting/TableSortableCell.jsx";
import {useTranslation} from "react-i18next";

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

    const {t} = useTranslation();
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
                    {t('buttons.create')}
                </Button>
            </Box>
            <SchoolCreateForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSuccess={async () => {
                    await loadSchools();
                    showSnackbar(t('notifications.schoolCreated'));
                }}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={styles.tableHeadRow}>
                            <TableSortableCell field="name"
                                               label={t('schoolTable.name')}
                                               sortField={sortField}
                                               sortDirection={sortDirection}
                                               onSort={handleSort}/>
                            <TableCell>{t('schoolTable.edrpou')}</TableCell>
                            <TableSortableCell field="region"
                                               label={t('schoolTable.region')}
                                               sortField={sortField}
                                               sortDirection={sortDirection}
                                               onSort={handleSort}/>
                            <TableSortableCell field="type"
                                               label={t('schoolTable.type')}
                                               sortField={sortField}
                                               sortDirection={sortDirection}
                                               onSort={handleSort}/>
                            <TableCell>{t('schoolTable.isActive')}</TableCell>
                            <TableCell>{t('schoolTable.action')}</TableCell>
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
                {pagination.totalElements === 0
                    ? `0 ${t('pagination.records')}`
                    : `${pagination.page * pagination.size + 1} – ${Math.min(
                        (pagination.page + 1) * pagination.size,
                        pagination.totalElements
                    )} ${t('pagination.of')} ${pagination.totalElements}`}
            </Box>

            <ConfirmationDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={async () => {
                    try {
                        await confirmDeactivate();
                        showSnackbar(t('notifications.schoolDeactivated'), 'info');
                    } catch (error) {
                        let message = t('notifications.deactivateFailed');

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
