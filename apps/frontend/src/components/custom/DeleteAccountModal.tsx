import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

export function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg="color.chaletGreen"
        width="400px"
        height="400px"
        borderRadius="xl"
        padding="10px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="20px"
        paddingTop="100px"
      >
        <ModalHeader color="color.white" textStyle="modalTitle">
          Suppression de compte
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody color="color.white">
          Attention ! La suppression du compte est irréversible.
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onCancel}>Annuler</Button>
          <Button colorScheme="white" onClick={onConfirm}>Supprimer mon compte</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
