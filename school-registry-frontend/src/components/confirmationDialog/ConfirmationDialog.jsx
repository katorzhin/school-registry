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
import {useTranslation} from "react-i18next";

const ConfirmationDialog = ({open, onClose, onConfirm}) => {

    const {t} = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={styles.dialog}>
            <DialogTitle>{t('dialog.confirmation')}</DialogTitle>
            <DialogContent>
                <DialogContentText>{t('dialog.confirmDeactivate')}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color="error">
                    {t('buttons.deactivate')}
                </Button>
                <Button onClick={onClose}>{t('buttons.cancel')}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
