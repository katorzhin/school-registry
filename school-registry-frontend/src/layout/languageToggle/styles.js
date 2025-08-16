export const styles = {
    borderRadius: '12px',
    border: '1px solid #E0E0E0',
    backgroundColor: '#fff',
    padding: '2px',
    '& .MuiToggleButton-root': {
        minWidth: '40px',
        padding: '4px 10px',
        fontWeight: 500,
        fontSize: '0.8rem',
        color: '#333',
        border: 'none',
        borderRadius: '8px !important',
        '&.Mui-selected': {
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': {
                backgroundColor: '#1565c0',
            },
        },
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
    },
};