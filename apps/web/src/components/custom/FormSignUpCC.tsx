import { Flex, Input, Stack, Text, VStack } from '@chakra-ui/react';
import ButtonCC from './ButtonCC';
import { useForm } from 'react-hook-form';
import { Field } from '../ui/field';
import { Toaster, toaster } from '@/components/ui/toaster';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUser } from '@/services/api';

const passwordValidation = new RegExp(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()-]).{8,}$/,
);

const CreateUserSchema = z
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

export type CreateUser = z.infer<typeof CreateUserSchema>;

const FormSignUpCC = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateUser>({
		resolver: zodResolver(CreateUserSchema),
	});

	const onSubmit = async (data: {
		pseudo: string;
		email: string;
		password: string;
		confirmPassword: string;
	}) => {
		try {
			const response = await createUser(data);
			console.log('user created', response);
		} catch (error) {
			console.error();
		}
	};

	return (
		<Flex>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack maxWidth="-webkit-fit-content" paddingTop={6}>
					<Text color="fg.error" fontSize="sm" alignSelf="flex-end">
						* Champs obligatoires
					</Text>

					<VStack gap="4">
						<Field
							label={t('pseudo')}
							invalid={!!errors.pseudo}
							errorText={errors.pseudo?.message}
						>
							<Input
								rounded="md"
								shadow="md"
								variant="flushed"
								{...register('pseudo', { required: t('requiredField') })}
							/>
						</Field>
						<Field
							label={t('mail')}
							invalid={!!errors.email}
							errorText={errors.email?.message}
						>
							<Input
								rounded="md"
								shadow="md"
								variant="flushed"
								{...register('email', { required: t('requiredField') })}
							/>
						</Field>

						<Field
							label={t('password')}
							invalid={!!errors.password}
							errorText={errors.password?.message}
						>
							<Input
								rounded="md"
								shadow="md"
								variant="flushed"
								{...register('password', { required: t('requiredField') })}
							/>
						</Field>

						<Field
							label={t('confirmPassword')}
							invalid={!!errors.confirmPassword}
							errorText={errors.confirmPassword?.message}
						>
							<Input
								rounded="md"
								shadow="md"
								variant="flushed"
								{...register('confirmPassword', {
									required: t('requiredField'),
								})}
							/>
						</Field>

						<ul color="red.500">
							Votre mot de passe doit inclure :<li>au moins 8 caractères</li>
							<li>une majuscule</li>
							<li>une minuscule</li>
							<li>un chiffre</li>
							<li>un caractère spécial (+ - [ ] * ~ _ # : ?)</li>
						</ul>
						{/* <Trans i18nKey="form.passwordInstructions" /> */}

						<ButtonCC
							type="submit"
							width="22rem"
							fontSize="1.375rem"
							fontWeight="bold"
							fontColor="color.white"
							backgroundColor="color.chaletGreen"
							text={t('signIn')}
							onClick={() =>
								toaster.create({
									description: t('confirmCreation'),
									type: 'success',
								})
							}
						></ButtonCC>
						<Text>
							{t('alreadyCreated') + ' '}
							<Link to="/login">
								<b>{t('login')}</b>
							</Link>
						</Text>
					</VStack>
				</Stack>
				<Toaster />
			</form>
		</Flex>
	);
};

export default FormSignUpCC;
