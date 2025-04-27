import { z } from 'zod';
export declare const CreateUserSchema: z.ZodEffects<z.ZodObject<{
    pseudo: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    pseudo: string;
    email: string;
    password: string;
    confirmPassword: string;
}, {
    pseudo: string;
    email: string;
    password: string;
    confirmPassword: string;
}>, {
    pseudo: string;
    email: string;
    password: string;
    confirmPassword: string;
}, {
    pseudo: string;
    email: string;
    password: string;
    confirmPassword: string;
}>;
