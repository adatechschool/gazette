import { z } from 'zod';

const passwordValidation = new RegExp(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()-]).{8,}$/,
);

export const CreateUserSchema = z
	.object({
		pseudo: z.string().min(2, { message: 'must be at least 2 characters' }),
		email: z.string().email(),
		password: z
			.string()
			.min(8, { message: 'must contains at least 8 characters' })
			.regex(passwordValidation),
		confirmPassword: z
			.string()
			.min(8, { message: 'must contains at least 8 characters' })
			.regex(passwordValidation),
	})
	.refine(
		(values) => {
			return values.password === values.confirmPassword;
		},
		{
			message: 'Passwords must match!',
			path: ['confirmPassword'],
		},
	);
