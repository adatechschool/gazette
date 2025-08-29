'use client'

import { UserDto } from '@gazette/shared'
import { createContext, useEffect, useMemo, useState } from 'react'
import { deleteUserAccount, getUserProfile, loginUser, logoutUser } from '@/services/api/user' // Fonctions API pour gérer l'authentification


// Cette interface définit exactement ce que contiendra notre contexte
interface AuthContextType {
  user: UserDto | null  // L'utilisateur connecté (ou null si pas connecté)
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  deleteAccount: () => Promise<void>
}

// 🎯 CRÉATION DU CONTEXTE
// createContext crée un "conteneur" qui peut stocker nos données d'authentification
// undefined = valeur par défaut (quand le contexte n'est pas encore fourni)
const AuthContext = createContext<AuthContextType | undefined>(undefined)


// FONCTION UTILITAIRE POUR CHARGER LE PROFIL
// Cette fonction séparée permet de réutiliser la logique de chargement
async function loadUserProfile(setUser: (user: UserDto | null) => void) {
  try {
     // On appelle l'API pour récupérer le profil de l'utilisateur
    const res = await getUserProfile()

     // Si ça marche, on met à jour l'état avec les données de l'utilisateur
    setUser({
      id: res.user.id,
      email: res.user.email,
      pseudo: res.user.pseudo,
    })
  }
  catch {
    // Si ça échoue (ex: pas connecté, token expiré), on met l'utilisateur à null
    setUser(null)
  }
}

// 🏠 COMPOSANT PROVIDER
// C'est le composant qui va "fournir" le contexte à tous ses enfants
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 📊 ÉTATS LOCAUX DU PROVIDER
  // État pour stocker les informations de l'utilisateur
  const [user, setUser] = useState<UserDto | null>(null)
    // État pour savoir si on est en train de charger
  const [loading, setLoading] = useState(true)

  // 🚀 EFFET AU MONTAGE DU COMPOSANT
  // useEffect avec un tableau vide [] = s'exécute une seule fois au montage
  useEffect(() => {
    // On essaie de charger le profil utilisateur au démarrage
    loadUserProfile(setUser).finally(() => setLoading(false)) // Dans tous les cas, on arrête le loading
  }, []) // Tableau vide = ne s'exécute qu'une fois

  // 🔑 FONCTIONS D'AUTHENTIFICATION
  // Fonction pour se connecter
  const login = async (email: string, password: string) => {
    await loginUser(email, password) // On appelle l'API de connexion
    await loadUserProfile(setUser)  // Puis on charge le profil
  }

   // Fonction pour se déconnecter
  const logout = async () => {
    await logoutUser() // On appelle l'API de déconnexion
    setUser(null) // On vide l'état utilisateur
  }

    // Fonction pour supprimer le compte
  const deleteAccount = async () => {
    await deleteUserAccount() // On appelle l'API de suppression
    setUser(null) // On vide l'état utilisateur
  } 

  // 🎯 OPTIMISATION AVEC useMemo
  // useMemo évite de recréer l'objet value à chaque rendu
  // Il ne se recalcule que si user ou loading changent
  const value = useMemo(() => ({ user, loading, login, logout, deleteAccount }), [user, loading])// Dépendances : se recalcule si user ou loading changent

  // 🎁 RENDU DU PROVIDER
  // On enveloppe tous les enfants avec le Provider
  // et on leur donne accès aux données via la prop "value"

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
