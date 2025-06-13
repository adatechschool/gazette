import { z } from 'zod'
import { UserRole } from '../enums'

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*()-]).{8,}$/,
)

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
    role: z.nativeEnum(UserRole).default(UserRole.USER),
  })
  .refine(values => values.password === values.confirmPassword, {
    message: 'Passwords must match!',
    path: ['confirmPassword'],
  })

export type CreateUserDto = z.infer<typeof CreateUserSchema>

export const LogUserSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'must contains at least 8 characters' })
      .regex(passwordValidation),
  })

export type LoginUserDto = z.infer<typeof LogUserSchema>
