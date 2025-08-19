/* eslint-disable react-hooks-extra/no-unnecessary-use-prefix */
import { fireEvent, render, screen } from '@testing-library/react'
import FormSignUp from '@/components/custom/FormSignUp'

// Mocks simples
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: any) => key, // Retourne simplement la clé
  }),
}))

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ login: jest.fn() }),
}))

jest.mock('@/services/api/user', () => ({
  createUser: jest.fn(),
}))

jest.mock('@/components/custom/Modal', () => ({
  WelcomeModal: () => null,
}))

describe('formSignUp', () => {
  it('renders the signup form correctly', () => {
    render(<FormSignUp />)

    expect(screen.getByRole('textbox', { name: /pseudo/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /mail/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^confirmPassword$/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /signIn/i })).toBeInTheDocument()
  })

  it('can fill out the form', () => {
    render(<FormSignUp />)

    fireEvent.change(screen.getByRole('textbox', { name: /pseudo/i }), {
      target: { value: 'testuser' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /mail/i }), {
      target: { value: 'test@example.com' },
    })

    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument()
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
  })

  it('shows password requirements', () => {
    render(<FormSignUp />)

    expect(screen.getByText(/au moins 8 caractères/i)).toBeInTheDocument()
    expect(screen.getByText(/une majuscule/i)).toBeInTheDocument()
  })
})
