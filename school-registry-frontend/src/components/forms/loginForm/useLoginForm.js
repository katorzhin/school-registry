import { useState } from 'react';
import { useAuth } from '@/context/AuthContext.jsx';
import { login as loginApi } from '@/api/authApi';
import {useTranslation} from "react-i18next";
import {loginSchema} from "@/validators/loginValidator.js";
import {toast} from "react-toastify";
import {ErrorCodes} from "@/constants/error-codes.js";

export const useLoginForm = () => {
    const { t } = useTranslation();
    const { login } = useAuth();
    const [form, setForm] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = loginSchema(t).safeParse(form);
        if (!result.success) {
            const fieldErrors = {};
            for (const issue of result.error.issues) {
                fieldErrors[issue.path[0]] = issue.message;
            }
            setErrors(fieldErrors);
            return;
        }

        try {
            const { token } = await loginApi(form);
            login(token);
        } catch (err) {
            if (err.code === ErrorCodes.INVALID_CREDENTIALS) {
                toast.error(t('auth.error.badCredentials'));
            } else {
                toast.error(err.message || t('auth.error.login'));
            }
        }
    };

    return {
        form,
        errors,
        handleChange,
        handleSubmit,
    };
};