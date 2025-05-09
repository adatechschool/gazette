import { HStack, Input, Stack, Text, VStack } from '@chakra-ui/react';
import ButtonCC from './ButtonCC';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Field } from '../ui/field';
import { Toaster } from '../ui/toaster';
import { Link } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { PasswordInput } from '../ui/password-input';
import { login } from '@/services/api';

// type FormValues = {
// 	email: string;
// 	password: string;
// };

const FormLoginCC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation('common', { keyPrefix: 'accountManagement' });
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			const response = await login(data.email, data.password);
			console.log('✅ Login success:', response);
			navigate({ to: '/explore' });
		} catch (err) {
			console.error('❌ Login failed:', err);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack maxWidth="-webkit-fit-content" padding="10">
				<Text color="fg.error" fontSize="sm" alignSelf="flex-end">
					{t('obligatoryField')}
				</Text>

				<VStack gap="4">
					<HStack gap="4">
						<Field
							required
							label={t('mail')}
							invalid={!!errors.email}
							errorText={errors.email?.message}
						>
							<Input
								minW="md"
								rounded="md"
								shadow="md"
								variant="flushed"
								{...register('email')}
							/>
						</Field>
					</HStack>

					<HStack gap="4">
						<Field
							required
							label={t('password')}
							invalid={!!errors.password}
							errorText={errors.password?.message}
						>
							<PasswordInput
								minW="md"
								rounded="md"
								shadow="md"
								variant="flushed"
								{...register('password')}
							/>
						</Field>
					</HStack>

					<ul color="red.500">
						Votre mot de passe doit inclure :<li>au moins 8 caractères</li>
						<li>une majuscule</li>
						<li>une minuscule</li>
						<li>un chiffre</li>
						<li>un caractère spécial (+ - [ ] * ~ _ # : ?)</li>
					</ul>

					<ButtonCC
						type="submit"
						width="22rem"
						fontSize="1.375rem"
						fontWeight="bold"
						fontColor="color.white"
						backgroundColor="color.chaletGreen"
						text={t('login')}
					></ButtonCC>
					<Text>
						{t('noAccount') + ' '}
						<Link to="/signin">
							<b>{t('signIn')}</b>
						</Link>
					</Text>
				</VStack>
			</Stack>
			<Toaster />
		</form>
	);
};

export default FormLoginCC;
