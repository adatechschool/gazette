"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input, Text, VStack, Stack, Flex } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import Button from "./Button"

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
});

export default function FormSignUp() {
	const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	})
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		try {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: values.email,
					password: values.password,
				}),
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error.message || "Something went wrong")
			}

			router.push("/login")
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Flex>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack maxWidth="-webkit-fit-content" paddingTop={6}>
					<Text color="fg.error" fontSize="sm" alignSelf="flex-end">
						* Champs obligatoires
					</Text>

					<VStack gap="4">
						<Field
							label={t('mail')}
							invalid={!!errors.email}
							errorText={errors.email?.message}
						>
							<Input
								rounded="md"
								shadow="md"
								variant="flushed"
								{...register('email')}
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
								{...register('password')}
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
								{...register('confirmPassword')}
							/>
						</Field>

						<ul color="red.500">
							Votre mot de passe doit inclure :<li>au moins 8 caractères</li>
							<li>une majuscule</li>
							<li>une minuscule</li>
							<li>un chiffre</li>
							<li>un caractère spécial (+ - [ ] * ~ _ # : ?)</li>
						</ul>

						<Button
							width="22rem"
							fontSize="1.375rem"
							fontColor="color.white"
							backgroundColor="color.chaletGreen"
							text={t('signIn')}
							disabled={isLoading}
						/>
						<Text>
							{t('alreadyCreated') + ' '}
							<Link href="/login">
								<b>{t('login')}</b>
							</Link>
						</Text>
					</VStack>
				</Stack>
			</form>
		</Flex>
	)
}
