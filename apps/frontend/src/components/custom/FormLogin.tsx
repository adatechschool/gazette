import type { LoginUserDto } from '@gazette/shared'
import { Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack, Text, useToast } from '@chakra-ui/react'
import { LogUserSchema } from '@gazette/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import { PasswordInput } from '../ui/password-input'
import Button from './Button'
import PasswordRequirements from './PasswordRequirements'

function FormLogin() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })
  const router = useRouter()
  const toast = useToast()
  const { login, loading: authLoading } = useAuth()

  const LoginSchema = LogUserSchema

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserDto>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginUserDto) => {
    try {
      await login(data.email, data.password)
      router.push('/explore')
    }
    catch (error) {
      console.error('login error:', error)
      toast({
        title: t('error'),
        description: t('invalidCredentials'),
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  const isLoading = authLoading || isSubmitting

  return (
    <Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack maxWidth="-webkit-fit-content" paddingTop={6}>
          <HStack justifyContent="end">
            <Text textColor="red.500" fontSize="sm" alignSelf="flex-end">
              *
            </Text>
            <Text fontSize="sm" alignSelf="flex-end">
              {t('requiredFields')}
            </Text>
          </HStack>

          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel>{t('mail')}</FormLabel>
            <Input
              minW="md"
              rounded="md"
              shadow="md"
              variant="flushed"
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
              {...register('password', { required: t('requiredField') })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <PasswordRequirements />

          <Button
            type="submit"
            width="22rem"
            textStyle="button"
            fontColor="color.white"
            backgroundColor="color.chaletGreen"
            text={t('login')}
            isLoading={isSubmitting || isLoading}
            disabled={isLoading}
          />
          <Text>
            {`${t('noAccount')} `}
            <Link href="/signin">
              <b>{t('signIn')}</b>
            </Link>
          </Text>
        </Stack>
      </form>
    </Flex>
  )
}

export default FormLogin
