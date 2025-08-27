import { ListItem, Text, UnorderedList } from '@chakra-ui/react'

function PasswordRequirements() {
  return (
    <UnorderedList fontSize="sm">
      <Text>Votre mot de passe doit inclure :</Text>
      <ListItem>au moins 8 caractères</ListItem>
      <ListItem>une majuscule</ListItem>
      <ListItem>une minuscule</ListItem>
      <ListItem>un chiffre</ListItem>
      <ListItem>un caractère spécial (- [ ] ( ) * ~ _ # : ?)</ListItem>
    </UnorderedList>
  )
}

export default PasswordRequirements
