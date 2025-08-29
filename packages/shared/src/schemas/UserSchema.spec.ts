import { CreateUserSchema, SignUpFormSchema, LogUserSchema } from './UserSchema'

describe('User Schema Validation', () => {
  describe('CreateUserSchema', () => {
    it('should accept valid user data', () => {
      const validUser = {
        pseudo: 'testuser',
        email: 'test@example.com',
        password: 'ValidPass123?'
      }
      
      const result = CreateUserSchema.safeParse(validUser)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data.pseudo).toBe('testuser')
        expect(result.data.email).toBe('test@example.com')
      }
    })

    describe('pseudo validation', () => {
      it('should reject pseudo with less than 2 characters', () => {
        const invalidUser = {
          pseudo: 'a',
          email: 'test@example.com',
          password: 'ValidPass123?'
        }
        
        const result = CreateUserSchema.safeParse(invalidUser)
        expect(result.success).toBe(false)
        
        if (!result.success) {
          const pseudoError = result.error.issues.find(issue => issue.path[0] === 'pseudo')
          expect(pseudoError?.message).toBe('must be at least 2 characters')
        }
      })

      it('should accept pseudo with exactly 2 characters', () => {
        const validUser = {
          pseudo: 'ab',
          email: 'test@example.com',
          password: 'ValidPass123?'
        }
        
        expect(CreateUserSchema.safeParse(validUser).success).toBe(true)
      })

      it('should accept long pseudo', () => {
        const validUser = {
          pseudo: 'verylongpseudothatshouldbefine',
          email: 'test@example.com',
          password: 'ValidPass123?'
        }
        
        expect(CreateUserSchema.safeParse(validUser).success).toBe(true)
      })
    })

    describe('email validation', () => {
      it('should reject invalid email formats', () => {
        const invalidEmails = [
          'not-an-email',
          '@example.com',
          'test@',
          'test.example.com',
          ''
        ]

        invalidEmails.forEach(email => {
          const invalidUser = {
            pseudo: 'testuser',
            email,
            password: 'ValidPass123?'
          }
          
          const result = CreateUserSchema.safeParse(invalidUser)
          expect(result.success).toBe(false)
        })
      })

      it('should accept valid email formats', () => {
        const validEmails = [
          'test@example.com',
          'user.name@domain.co.uk',
          'test123@gmail.com',
          'a@b.com'
        ]

        validEmails.forEach(email => {
          const validUser = {
            pseudo: 'testuser',
            email,
            password: 'ValidPass123?'
          }
          
          expect(CreateUserSchema.safeParse(validUser).success).toBe(true)
        })
      })
    })

    describe('password validation', () => {
      it('should reject passwords with less than 8 characters', () => {
        const invalidUser = {
          pseudo: 'testuser',
          email: 'test@example.com',
          password: 'Abc1?'
        }
        
        const result = CreateUserSchema.safeParse(invalidUser)
        expect(result.success).toBe(false)
        
        if (!result.success) {
          const passwordError = result.error.issues.find(issue => issue.path[0] === 'password')
          expect(passwordError?.message).toBe('must contains at least 8 characters')
        }
      })

      it('should reject password without uppercase letter', () => {
        const invalidUser = {
          pseudo: 'testuser',
          email: 'test@example.com',
          password: 'lowercase123?'
        }
        
        const result = CreateUserSchema.safeParse(invalidUser)
        expect(result.success).toBe(false)
        
        if (!result.success) {
          const passwordError = result.error.issues.find(issue => issue.path[0] === 'password')
          expect(passwordError?.message).toContain('uppercase')
        }
      })

      it('should reject password without lowercase letter', () => {
        const invalidUser = {
          pseudo: 'testuser',
          email: 'test@example.com',
          password: 'UPPERCASE123?'
        }
        
        const result = CreateUserSchema.safeParse(invalidUser)
        expect(result.success).toBe(false)
      })

      it('should reject password without number', () => {
        const invalidUser = {
          pseudo: 'testuser',
          email: 'test@example.com',
          password: 'ValidPass?'
        }
        
        const result = CreateUserSchema.safeParse(invalidUser)
        expect(result.success).toBe(false)
      })

      it('should reject password without special character', () => {
        const invalidUser = {
          pseudo: 'testuser',
          email: 'test@example.com',
          password: 'ValidPass123'
        }
        
        const result = CreateUserSchema.safeParse(invalidUser)
        expect(result.success).toBe(false)
      })

      it('should accept password with all valid special characters', () => {
        const validSpecialChars = ['-', '[', ']', '(', ')', '*', '~', '_', '#', ':', '?']
        
        validSpecialChars.forEach(char => {
          const validUser = {
            pseudo: 'testuser',
            email: 'test@example.com',
            password: `ValidPass123${char}`
          }
          
          expect(CreateUserSchema.safeParse(validUser).success).toBe(true)
        })
      })

      it('should reject password with invalid special characters', () => {
        const invalidSpecialChars = ['!', '@', '$', '%', '^', '&', '+', '=']
        
        invalidSpecialChars.forEach(char => {
          const invalidUser = {
            pseudo: 'testuser',
            email: 'test@example.com',
            password: `ValidPass123${char}`
          }
          
          expect(CreateUserSchema.safeParse(invalidUser).success).toBe(false)
        })
      })
    })
  })

  describe('SignUpFormSchema', () => {
    it('should accept valid signup form with matching passwords', () => {
      const validSignUp = {
        pseudo: 'testuser',
        email: 'test@example.com',
        password: 'ValidPass123?',
        confirmPassword: 'ValidPass123?'
      }
      
      const result = SignUpFormSchema.safeParse(validSignUp)
      expect(result.success).toBe(true)
    })

    it('should reject signup form with non-matching passwords', () => {
      const invalidSignUp = {
        pseudo: 'testuser',
        email: 'test@example.com',
        password: 'ValidPass123?',
        confirmPassword: 'DifferentPass123?'
      }
      
      const result = SignUpFormSchema.safeParse(invalidSignUp)
      expect(result.success).toBe(false)
      
      if (!result.success) {
        const confirmPasswordError = result.error.issues.find(
          issue => issue.path.includes('confirmPassword')
        )
        expect(confirmPasswordError?.message).toBe('Passwords must match!')
      }
    })

    it('should inherit all validations from CreateUserSchema', () => {
      const invalidSignUp = {
        pseudo: 'a', // Trop court
        email: 'invalid-email',
        password: 'weak',
        confirmPassword: 'weak'
      }
      
      const result = SignUpFormSchema.safeParse(invalidSignUp)
      expect(result.success).toBe(false)
      
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1) // Plusieurs erreurs
      }
    })
  })

  describe('LogUserSchema', () => {
    it('should accept valid login data', () => {
      const validLogin = {
        email: 'test@example.com',
        password: 'ValidPass123?'
      }
      
      const result = LogUserSchema.safeParse(validLogin)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email in login', () => {
      const invalidLogin = {
        email: 'not-an-email',
        password: 'ValidPass123?'
      }
      
      const result = LogUserSchema.safeParse(invalidLogin)
      expect(result.success).toBe(false)
    })

    it('should reject invalid password in login', () => {
      const invalidLogin = {
        email: 'test@example.com',
        password: 'weak'
      }
      
      const result = LogUserSchema.safeParse(invalidLogin)
      expect(result.success).toBe(false)
    })

    it('should reject missing fields', () => {
      const incompleteLogin = {
        email: 'test@example.com'
        // password manquant
      }
      
      const result = LogUserSchema.safeParse(incompleteLogin)
      expect(result.success).toBe(false)
    })
  })

  describe('Type inference', () => {
    it('should infer correct types', () => {
      const validUser = {
        pseudo: 'testuser',
        email: 'test@example.com',
        password: 'ValidPass123?'
      }
      
      const result = CreateUserSchema.safeParse(validUser)
      
      if (result.success) {
        // TypeScript doit inférer les bons types
        const data = result.data
        expect(typeof data.pseudo).toBe('string')
        expect(typeof data.email).toBe('string')
        expect(typeof data.password).toBe('string')
      }
    })
  })
})