

import { useState } from 'react';
import { Flex, HStack, Input, Stack, Text, VStack, useToast } from '@chakra-ui/react';
import Button from './Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Field } from '../ui/field';
import { useTranslation } from 'react-i18next';
import { PasswordInput } from '../ui/password-input';
import { loginUser } from '@/services/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogUserSchema, LoginUserDto} from '@gazette/shared';
import { zodResolver } from '@hookform/resolvers/zod';

const FormLogin = () => {
	const { t } = useTranslation('common', { 
		keyPrefix: 'accountManagement' });
	const router = useRouter();
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);

	type FormValuesLog = Omit<LoginUserDto, 'role'>;
	
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValuesLog>({
		resolver: zodResolver(LogUserSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: FormValuesLog) => {
		setIsLoading(true);
		try {
			const response = await loginUser(data.email, data.password);
			console.log('user created', response);

			toast({
				title: t('success'),
				description: t('confirmCreation'),
				status: 'success',
				duration: 3000,
				isClosable: true,
			});

			// Attendre un court instant avant la redirection
			setTimeout(() => {
				router.push('/explore');
			}, 1000);
		} catch (error) {
			console.error(error);
			toast({
				title: t('error'),
				description: t('errorCreation'),
				status: 'error',
				duration: 4000,
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Flex>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack maxWidth="-webkit-fit-content" paddingTop={6}>
					<Text color="fg.error" fontSize="sm" alignSelf="flex-end">
						* Champs obligatoires
					</Text>

						<Field
							label={t('mail')}
							isInvalid={!!errors.email}
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
							isInvalid={!!errors.password}
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


						<ul color="red.500">
							Votre mot de passe doit inclure :<li>au moins 8 caractères</li>
							<li>une majuscule</li>
							<li>une minuscule</li>
							<li>un chiffre</li>
							<li>un caractère spécial (- [ ] ( ) * ~ _ # : ?)</li>
						</ul>

						<Button
							type="submit"
							width="22rem"
							fontSize="1.375rem"
							fontWeight="bold"
							fontColor="color.white"
							backgroundColor="color.chaletGreen"
							text={t('login')}
							disabled={isLoading}
						/>
						<Text>
							{t('alreadyConnected') + ' '}
							<Link href="/login">
								<b>{t('login')}</b>
							</Link>
						</Text>
					</Stack>
			</form>
		</Flex>
	)
};

export default FormLogin;













