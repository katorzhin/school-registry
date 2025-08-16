export const styles = {
    dialog: {
        '& .MuiDialog-paper': {
            width: '500px',
        },
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 1,
    },
    errorText: {
        color: '#d32f2f',
        fontSize: '0.75rem',
        margin: '3px 14px 0',
    },
    formControlWithClear: {
        '&:hover .clear-button': {
            visibility: 'visible',
        },
        '& .MuiOutlinedInput-root.Mui-focused .clear-button': {
            visibility: 'visible',
        },
        '& .MuiSelect-select[aria-expanded="true"] ~ .clear-button': {
            visibility: 'hidden',
        },
    },
};
