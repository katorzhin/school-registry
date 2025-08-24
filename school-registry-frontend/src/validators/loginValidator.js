import { z } from 'zod';

export const loginSchema = (t) =>
    z.object({
        username: z.string().min(1, t('auth.error.usernameRequired')),
        password: z.string().min(1, t('auth.error.passwordRequired')),
    });