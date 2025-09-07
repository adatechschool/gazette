import { faker } from '@faker-js/faker'
import { expect, test } from '@playwright/test'

test.describe('Authentication E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002/')
  })

  test('should register a new user', async ({ page }) => {
    const testUser = {
      pseudo: faker.person.firstName(),
      email: faker.internet.email(),
      password: 'Password(123)',
    }

    await page.click('a[href="/signin"]')
    await expect(page).toHaveURL('http://localhost:3002/signin')

    await page.fill('[data-testid="pseudo-input"]', testUser.pseudo)
    await page.fill('[data-testid="email-input"]', testUser.email)
    await page.fill('[data-testid="password-input"]', testUser.password)
    await page.fill('[data-testid="confirm-password-input"]', testUser.password)

    const navigationPromise = page.waitForURL('http://localhost:3002/explore')
    await page.click('[data-testid="submit-button"]')
    await navigationPromise

    await expect(page).toHaveURL('http://localhost:3002/explore')
  })

  test('should login with existing user', async ({ page }) => {
    // Create the test user first
    const existingUser = {
      pseudo: 'testuser',
      email: 'test@example.com',
      password: 'Password(123)',
    }

    // Register the test user
    await page.goto('http://localhost:3002/signin')
    await page.fill('[data-testid="pseudo-input"]', existingUser.pseudo)
    await page.fill('[data-testid="email-input"]', existingUser.email)
    await page.fill('[data-testid="password-input"]', existingUser.password)
    await page.fill('[data-testid="confirm-password-input"]', existingUser.password)
    await page.click('[data-testid="submit-button"]')

    // Wait for registration to complete and redirect
    await page.waitForURL('http://localhost:3002/explore')

    // Now try to log out
    await page.click('a[href="/settings"]')
    await page.click('[data-testid="logout-link"]')
    await page.waitForURL('http://localhost:3002/')

    // Now proceed with the login test
    await page.click('a[href="/login"]')
    await expect(page).toHaveURL('http://localhost:3002/login')

    await page.fill('[data-testid="email-input"]', existingUser.email)
    await page.fill('[data-testid="password-input"]', existingUser.password)

    const navigationPromise = page.waitForURL('http://localhost:3002/explore')
    await page.click('[data-testid="submit-button"]')
    await navigationPromise

    await expect(page).toHaveURL('http://localhost:3002/explore')
  })

  test('should logout user', async ({ page }) => {
    // Create the test user first
    const existingUser = {
      pseudo: 'testuser2', // Using a different user to avoid conflicts
      email: 'test2@example.com',
      password: 'Password(123)',
    }

    // Register the test user
    await page.goto('http://localhost:3002/signin')
    await page.fill('[data-testid="pseudo-input"]', existingUser.pseudo)
    await page.fill('[data-testid="email-input"]', existingUser.email)
    await page.fill('[data-testid="password-input"]', existingUser.password)
    await page.fill('[data-testid="confirm-password-input"]', existingUser.password)
    await page.click('[data-testid="submit-button"]')
    await page.waitForURL('http://localhost:3002/explore')

    await page.click('a[href="/settings"]')
    const navigationPromise = page.waitForURL('http://localhost:3002/')
    await page.click('[data-testid="logout-link"]')
    await navigationPromise

    await expect(page).toHaveURL('http://localhost:3002/')
  })
})
