export const styles = {
    container: {
        display: 'flex',
        gap: 2,
        mb: 2,
    },
    select: {
        minWidth: 160,
    },
    label: {
        mt: -0.9,
    },

    adornment: {
        mr: 1,
    },

    regionAdornment: {
        position: 'absolute',
        right: 8,
    },
    clearButton: {
        padding: 1,
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
