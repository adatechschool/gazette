import { FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react'
import { UpdateUserDto } from '@gazette/shared'
import { useForm } from 'react-hook-form'
import Button from './Button'

export function UpdateProfileModal({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  currentUser,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: { pseudo?: string, email?: string, password?: string }) => void
  onCancel: () => void
  currentUser?: { pseudo?: string, email?: string } // Optionnel : pour pré-remplir
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateUserDto>({
    defaultValues: {
      pseudo: currentUser?.pseudo || '',
      email: currentUser?.email || '',
      password: '',
    },
  })

  const onSubmit = (formData: UpdateUserDto) => {
    const updateData: { pseudo?: string, email?: string, password?: string } = {}

    if (formData.pseudo && formData.pseudo.trim() !== '') {
      updateData.pseudo = formData.pseudo.trim()
    }
    if (formData.email && formData.email.trim() !== '') {
      updateData.email = formData.email.trim()
    }
    if (formData.password && formData.password.trim() !== '') {
      updateData.password = formData.password
    }

    onConfirm(updateData)
  }

  const handleCancel = () => {
    reset()
    onCancel()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent
        width="400px"
        borderRadius="xl"
        padding="10px"
      >
        <ModalHeader textStyle="modalTitle">
          Mise à jour du profil
        </ModalHeader>
        <ModalCloseButton color="color.chaletGreen" />

        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <FormLabel>Pseudo</FormLabel>
              <Input
                rounded="md"
                shadow="md"
                variant="flushed"
                {...register('pseudo')}
              />
              <FormErrorMessage>{errors.pseudo?.message}</FormErrorMessage>

              <FormLabel>Email</FormLabel>
              <Input
                rounded="md"
                shadow="md"
                variant="flushed"
                type="email"
                {...register('email')}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>

              <FormLabel>Nouveau mot de passe</FormLabel>
              <Input
                rounded="md"
                shadow="md"
                variant="flushed"
                type="password"
                {...register('password')}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </Stack>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            fontColor="color.white"
            backgroundColor="color.chaletGreen"
            variant="ghost"
            text="Annuler"
            onClick={handleCancel}
            mr={3}
          />
          <Button
            fontColor="color.white"
            backgroundColor="color.chaletGreen"
            text="Confirmer"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
