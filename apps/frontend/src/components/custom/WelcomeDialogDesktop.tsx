import {
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

const WelcomeDialogDesktop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack wrap="wrap" gap="4" margin={4}>
      <Button
        bgColor="#606C38"
        width="343px"
        height="50px"
        fontFamily="Poppins"
        fontWeight="bold"
        fontSize="22px"
        borderRadius="md"
        color="white"
        _hover={{ bgColor: "#4a5228" }}
        onClick={onOpen}
      >
        S'inscrire
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bienvenue sur Gazette !</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4}>
              Pour personnaliser ton fil d'actualités, abonne-toi aux médias qui
              t'intéressent depuis la page Explorer.
            </Text>
            
            <Text mb={4}>
              Leurs contenus apparaîtront automatiquement sur ta page d'Accueil.
            </Text>
            
            <Text>
              Sans abonnement, ta page d'Accueil restera vide. Tu peux choisir
              de t'abonner maintenant ou plus tard - c'est toi qui décides !
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default WelcomeDialogDesktop;