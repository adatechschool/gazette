import { Box, Icon, Link, List, ListItem } from '@chakra-ui/react'
import { FileBadge, HelpCircle, LogOut, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { deleteUserAccount } from '@/services/api'

function SettingsMenu() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount()
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <Box textAlign="center">
      <List spacing={2} variant="plain">
        <ListItem>
          <Icon as={LogOut} mr={2} />
          <Link
            href="/"
            fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
            fontSize={{ base: '1rem', lg: '2rem' }}
          >
            {t('logout')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={Trash} mr={2} />
          <Link
            onClick={() => handleDeleteAccount()}
            href="/"
            fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
            fontSize={{ base: '1rem', lg: '2rem' }}
          >
            {t('delete')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={HelpCircle} mr={2} />
          <Link
            href="/about"
            fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
            fontSize={{ base: '1rem', lg: '2rem' }}
          >
            {t('about')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={FileBadge} mr={2} />
          <Link
            fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
            fontSize={{ base: '1rem', lg: '2rem' }}
          >
            {t('policy')}
          </Link>
        </ListItem>
      </List>
    </Box>
  )
}

export default SettingsMenu
