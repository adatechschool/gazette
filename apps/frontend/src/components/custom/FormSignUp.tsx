'use client'

import { Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack, Text, useToast } from '@chakra-ui/react'
import { SignUpFormDto, SignUpFormSchema } from '@gazette/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuth } from '@/hooks/useAuth'
import { createUser } from '@/services/api/user'
import Button from './Button'
import { WelcomeModal } from './Modal'
import PasswordRequirements from './PasswordRequirements'

const SignUpSchema = SignUpFormSchema

function FormSignUp() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })
  const router = useRouter()
  const toast = useToast()
  const { login, loading } = useAuth()
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormDto>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SignUpFormDto) => {
    try {
      await createUser({
        pseudo: data.pseudo,
        email: data.email,
        password: data.password,
      })

      await login(data.email, data.password)
      toast({
        title: t('success'),
        description: t('confirmCreation'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      //setIsWelcomeModalOpen(true)
      router.replace('/explore')
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
  }

  const isLoading = loading || isSubmitting

  return (
    <Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack maxWidth="-webkit-fit-content">
          <HStack justifyContent="end">
            <Text textColor="red.500" fontSize="sm" alignSelf="flex-end">
              *
            </Text>
            <Text fontSize="sm" alignSelf="flex-end">
              {t('requiredFields')}
            </Text>
          </HStack>

          <FormControl isRequired isInvalid={!!errors.pseudo}>
            <FormLabel>{t('pseudo')}</FormLabel>
            <Input
              minW="md"
              rounded="md"
              shadow="md"
              variant="flushed"
              data-testid="pseudo-input"
              {...register('pseudo', { required: t('requiredField') })}
            />
            <FormErrorMessage>{errors.pseudo?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel>{t('mail')}</FormLabel>
            <Input
              rounded="md"
              shadow="md"
              variant="flushed"
              data-testid="email-input"
              {...register('email', { required: t('requiredField') })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.password}>
            <FormLabel>{t('password')}</FormLabel>
            <PasswordInput
              minW="md"
              rounded="md"
              shadow="md"
              variant="flushed"
              data-testid="password-input"
              {...register('password', { required: t('requiredField') })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.confirmPassword}>
            <FormLabel>{t('confirmPassword')}</FormLabel>
            <PasswordInput
              minW="md"
              rounded="md"
              shadow="md"
              variant="flushed"
              data-testid="confirm-password-input"
              {...register('confirmPassword', {
                required: t('requiredField'),
              })}
            />
            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
          </FormControl>

          <PasswordRequirements />

          <Button
            type="submit"
            width="22rem"
            textStyle="button"
            fontColor="color.white"
            backgroundColor="color.chaletGreen"
            data-testid="submit-button"
            text={t('signIn')}
            isLoading={isSubmitting || isLoading}
            disabled={isLoading}
          />
          <Text>
            {`${t('alreadyCreated')} `}
            <Link href="/login">
              <b>{t('login')}</b>
            </Link>
          </Text>
        </Stack>
      </form>
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => {
          setIsWelcomeModalOpen(false)
          router.replace('/explore')
        }}
      />
    </Flex>
  )
}

export default FormSignUp
