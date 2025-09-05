import { z } from 'zod'

const passwordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[-[\]()*~_#:?]).{8,}$/

export const CreateUserSchema = z
  .object({
    pseudo: z.string().min(2, { message: 'Must be at least 2 characters' }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Must contain at least 8 characters' })
      .regex(passwordValidation, { message: 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (- [ ] ( ) * ~ _ # : ?)' }),
  })

export type CreateUserDto = z.infer<typeof CreateUserSchema>

// frontend validation schema (including confirmPassword)
export const SignUpFormSchema = z
  .object({
    pseudo: z.string().min(2, { message: 'Le pseudo doit être composé au minimun de 2 caractères' }),
    email: z.string().email('Le format de l\'email est invalide'),
    password: z
      .string()
      .min(8, { message: 'Le mot de passe doit être composé au minimum de 8 caractères' })
      .regex(passwordValidation, 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (- [ ] ( ) * ~ _ # : ?)'),
    confirmPassword: z.string(),
  })
  .refine(values => values.password === values.confirmPassword, {
    message: 'Les mots de passe doivent être identiques',
    path: ['confirmPassword'],
  })

export type SignUpFormDto = z.infer<typeof SignUpFormSchema>

export const LogUserSchema = z
  .object({
    email: z.string().email('Le format de l\'email est invalide'),
    password: z
      .string()
      .min(8, 'Le mot de passe doit être composé au minimum de 8 caractères')
      .regex(passwordValidation, 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (- [ ] ( ) * ~ _ # : ?)'),
  })

export type LoginUserDto = z.infer<typeof LogUserSchema>

export const UpdateUserSchema = z
  .object({
    pseudo: z.string().min(2, { message: 'Must be at least 2 characters' }).optional().nullable(),
    email: z.string().email().optional().nullable(),
    password: z
      .string()
      .min(8, { message: 'Must contain at least 8 characters' })
      .regex(passwordValidation, { message: 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (- [ ] ( ) * ~ _ # : ?)' })
      .optional()
      .nullable(),
  })

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>
