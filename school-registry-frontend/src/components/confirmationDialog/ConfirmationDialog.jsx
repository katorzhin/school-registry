import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    DialogContentText,
    Button,
} from '@mui/material';

import {styles} from './styles.js';

const ConfirmationDialog = ({open, onClose, onConfirm}) => (
    <Dialog
        open={open}
        onClose={onClose}
        sx={styles.dialog}>
        <DialogTitle>Підтвердження</DialogTitle>
        <DialogContent>
            <DialogContentText>Деактивувати цю школу?</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                onClick={onConfirm}
                variant="contained"
                color="error">
                Деактивувати
            </Button>
            <Button onClick={onClose}>Скасувати</Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmationDialog;
