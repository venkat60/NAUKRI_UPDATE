// spec: tests/login-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication - Negative Testing', () => {
  test('Login with valid username and invalid password', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // 2. Enter valid username 'rahulshettyacademy'
    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
    
    // 3. Enter invalid password 'wrongpassword'
    await page.getByRole('textbox', { name: 'Password:' }).fill('wrongpassword');
    
    // 4. Check terms checkbox
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
    
    // 5. Click Sign In
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify expectations - page remains on login page
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  });

  test('Login with empty username field', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Leave username field empty
    const usernameField = page.getByRole('textbox', { name: 'Username:' });
    await expect(usernameField).toHaveValue('');
    
    // Enter password
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');
    
    // Check terms checkbox
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
    
    // Click Sign In
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify expectations - page remains on login page
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  });

  test('Login with empty password field', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Enter username
    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
    
    // Leave password field empty
    const passwordField = page.getByRole('textbox', { name: 'Password:' });
    await expect(passwordField).toHaveValue('');
    
    // Check terms checkbox
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
    
    // Click Sign In
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify expectations - page remains on login page
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  });

  test('Login with both username and password fields empty', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Leave both fields empty
    await expect(page.getByRole('textbox', { name: 'Username:' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Password:' })).toHaveValue('');
    
    // Check terms checkbox
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
    
    // Click Sign In
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify expectations - page remains on login page
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  });

  test('Password field is case-sensitive', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Enter username
    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
    
    // Enter password with wrong case
    await page.getByRole('textbox', { name: 'Password:' }).fill('learning@830$3mk2');
    
    // Check terms checkbox
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
    
    // Click Sign In
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify expectations - page remains on login page (login fails due to case mismatch)
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  });
});
