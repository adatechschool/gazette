"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()-]).{8,}$/);
exports.CreateUserSchema = zod_1.z
    .object({
    pseudo: zod_1.z.string().min(2, { message: 'must be at least 2 characters' }),
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, { message: 'must contains at least 8 characters' })
        .regex(passwordValidation),
    confirmPassword: zod_1.z
        .string()
        .min(8, { message: 'must contains at least 8 characters' })
        .regex(passwordValidation),
})
    .refine((values) => {
    return values.password === values.confirmPassword;
}, {
    message: 'Passwords must match!',
    path: ['confirmPassword'],
});
//# sourceMappingURL=user.zods.js.map