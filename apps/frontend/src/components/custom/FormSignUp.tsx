'use client'

import type { CreateUserDto } from '@gazette/shared'
import { Flex, Input, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import { CreateUserSchema, UserRole } from '@gazette/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PasswordInput } from '@/components/ui/password-input'
import { createUser } from '@/services/api'
import { Field } from '../ui/field'
import Button from './Button'

function FormSignUp() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  type FormValuesSignUp = Omit<CreateUserDto, 'role'>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesSignUp>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: FormValuesSignUp) => {
    setIsLoading(true)
    try {
      const response = await createUser({ ...data, role: UserRole.USER })
      console.log('user created', response)

      toast({
        title: t('success'),
        description: t('confirmCreation'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      // Attendre un court instant avant la redirection
      setTimeout(() => {
        router.push('/explore')
      }, 1000)
    }
    catch (error) {
      console.error(error)
      toast({
        title: t('error'),
        description: t('errorCreation'),
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
    finally {
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
              label={t('pseudo')}
              isInvalid={!!errors.pseudo}
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

            <Field
              label={t('confirmPassword')}
              isInvalid={!!errors.confirmPassword}
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
              Votre mot de passe doit inclure :
              <li>au moins 8 caractères</li>
              <li>une majuscule</li>
              <li>une minuscule</li>
              <li>un chiffre</li>
              <li>un caractère spécial ( - [ ] ( ) * ~ _ # : ?)</li>
            </ul>

            <Button
              type="submit"
              width="22rem"
              fontSize="1.375rem"
              fontWeight="bold"
              fontColor="color.white"
              backgroundColor="color.chaletGreen"
              text={t('signIn')}
              disabled={isLoading}
            />
            <Text>
              {`${t('alreadyCreated')} `}
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

export default FormSignUp
