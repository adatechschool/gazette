import { Box, Icon, Link, List, ListItem } from '@chakra-ui/react'
import { FileBadge, HelpCircle, LogOut, PencilLine, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToaster } from '@/components/ui/toaster'
import { useAuth } from '@/hooks/useAuth'
import { updateUser } from '@/services/api/user'
import { DeleteAccountModal } from './DeleteAccountModal'
import { UpdateProfileModal } from './UpdateProfileModal'

function SettingsMenu() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

  const { user, logout, deleteAccount } = useAuth()
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const toaster = useToaster()
  const router = useRouter()

  const handleUpdateProfile = () => {
    setUpdateModalOpen(true)
  }

  const handleCancelUpdate = () => {
    setUpdateModalOpen(false)
  }

  const handleConfirmUpdate = async (updateData: { pseudo?: string, email?: string, password?: string }) => {
    try {
      if (!user?.id) {
        toaster.create({
          description: t('errorUpdatingProfile'),
          type: 'error',
          duration: 5000,
        })
        setUpdateModalOpen(false)
        return
      }
      await updateUser(updateData)
      toaster.create({
        description: t('profileUpdated'),
        type: 'success',
        duration: 5000,
      })
      setUpdateModalOpen(false)
    }
    catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error)
      toaster.create({
        description: t('errorUpdatingProfile'),
        type: 'error',
        duration: 5000,
      })
      setUpdateModalOpen(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    }
    catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  const handleDeleteAccount = () => {
    setDeleteModalOpen(true)
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false)
  }

  const handleConfirmDeleteAccount = async () => {
    try {
      await deleteAccount()
      toaster.create({
        description: t('accountDeleted'),
        type: 'success',
        duration: 5000,
      })
      setDeleteModalOpen(false)
      router.push('/')
    }
    catch (error) {
      console.error('Erreur lors de la suppression du compte:', error)
      toaster.create({
        description: t('errorDeletingAccount'),
        type: 'error',
        duration: 5000,
      })
      setDeleteModalOpen(false)
    }
  }

  return (
    <Box textAlign="left">
      <List spacing={2} variant="plain">
        <ListItem>
          <Icon as={PencilLine} mr={2} />
          <Link
            onClick={handleUpdateProfile}
            cursor="pointer"
            textStyle="nav"
          >
            {t('editProfile')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={LogOut} mr={2} />
          <Link
            onClick={handleLogout}
            cursor="pointer"
            textStyle="nav"
          >
            {t('logout')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={Trash} mr={2} />
          <Link
            onClick={handleDeleteAccount}
            cursor="pointer"
            textStyle="nav"
          >
            {t('delete')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={HelpCircle} mr={2} />
          <Link
            href="/about"
            textStyle="nav"
          >
            {t('about')}
          </Link>
        </ListItem>
        <ListItem>
          <Icon as={FileBadge} mr={2} />
          <Link
            textStyle="nav"
          >
            {t('policy')}
          </Link>
        </ListItem>
      </List>
      <UpdateProfileModal
        isOpen={updateModalOpen}
        onClose={handleCancelUpdate}
        onConfirm={handleConfirmUpdate} // ✅ Maintenant correct
        onCancel={handleCancelUpdate}
        currentUser={user ?? undefined} // ✅ Passer les données actuelles
      />
      <DeleteAccountModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDeleteAccount}
        onCancel={handleCancelDelete}
      />
    </Box>
  )
}

export default SettingsMenu
