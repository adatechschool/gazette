import { Flex, Input, Stack, Text, VStack } from '@chakra-ui/react';
import ButtonCC from './ButtonCC';
import { useForm } from 'react-hook-form';
import { Field } from '../ui/field';
import { Toaster, toaster } from '@/components/ui/toaster';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

type FormValues = {
	pseudo: string;
	email: string;
	password: string;
	passwordConfirmation: string;
};

const FormSignUpCC = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const onSubmit = handleSubmit((data) => console.log(data));

	return (
		<Flex>
			<form onSubmit={onSubmit}>
				<Stack maxWidth="-webkit-fit-content" paddingTop={6}>
					<Text color="fg.error" fontSize="sm" alignSelf="flex-end">
						* Champs obligatoires
					</Text>

					<VStack gap="4">
						<Field
							required
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
							required
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
							required
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
							required
							label={t('confirmPassword')}
							invalid={!!errors.passwordConfirmation}
							errorText={errors.passwordConfirmation?.message}
						>
							<Input
								rounded="md"
								shadow="md"
								variant="flushed"
								{...register('passwordConfirmation', {
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
