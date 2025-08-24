import React from 'react';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { styles } from './styles';

const ToastNotifications = () => (
    <ToastContainer
        hideProgressBar
        autoClose={2000}
        position="top-right"
        theme="colored"
        toastStyle={styles.main}
    />
);

export default ToastNotifications;