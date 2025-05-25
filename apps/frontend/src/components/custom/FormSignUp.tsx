import { Flex, Input, Stack, Text, VStack } from '@chakra-ui/react';
import Button from './Button';
import { useForm } from 'react-hook-form';
import { Field } from '../ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { Toaster, toaster } from '@/components/ui/toaster';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUser } from '@/services/api';
import { CreateUserDto, CreateUserSchema } from '@gazette/shared';

const FormSignUpCC = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateUserDto>({
		resolver: zodResolver(CreateUserSchema),
	});

	const onSubmit = async (data: CreateUserDto) => {
		try {
			const response = await createUser(data);
			console.log('user created', response);

			// Afficher le toaster
			toaster.create({
				description: t('confirmCreation'),
				type: 'success',
				duration: 3000, // Réduire la durée pour une meilleure expérience
			});

			// Attendre un court instant avant la redirection
			setTimeout(() => {
				navigate({
					to: '/explore',
				});
			}, 1000); // Attendre 1 seconde avant la redirection
		} catch (error) {
			console.error(error);
			toaster.create({
				description: t('errorCreation'),
				type: 'error',
				duration: 4000,
			});
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
							<PasswordInput
								minW="md"
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
							<PasswordInput
								minW="md"
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

						<Button
							type="submit"
							width="22rem"
							fontSize="1.375rem"
							fontWeight="bold"
							fontColor="color.white"
							backgroundColor="color.chaletGreen"
							text={t('signIn')}
						></Button>
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
