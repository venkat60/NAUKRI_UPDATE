// spec: tests/login-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Form Input Validation and Edge Cases', () => {
  test('Input fields accept special characters', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const usernameField = page.getByRole('textbox', { name: 'Username:' });
    const passwordField = page.getByRole('textbox', { name: 'Password:' });
    
    // Enter special characters in username field
    const specialChars = '@#$%^&*()';
    await usernameField.fill(specialChars);
    await expect(usernameField).toHaveValue(specialChars);
    
    // Enter special characters in password field
    await passwordField.fill(specialChars);
    await expect(passwordField).toHaveValue(specialChars);
    
    // Clear both fields
    await usernameField.clear();
    await passwordField.clear();
    await expect(usernameField).toHaveValue('');
    await expect(passwordField).toHaveValue('');
  });

  test('Username and password fields accept whitespace', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const usernameField = page.getByRole('textbox', { name: 'Username:' });
    const passwordField = page.getByRole('textbox', { name: 'Password:' });
    
    // Enter spaces in username field
    await usernameField.fill('   test   ');
    await expect(usernameField).toHaveValue('   test   ');
    
    // Enter spaces in password field
    await passwordField.fill('   pass   ');
    await expect(passwordField).toHaveValue('   pass   ');
    
    // Click Sign In button - should handle without errors
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Page should remain on login page (invalid credentials)
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  });

  test('Username field accepts long strings', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const usernameField = page.getByRole('textbox', { name: 'Username:' });
    const passwordField = page.getByRole('textbox', { name: 'Password:' });
    
    // Enter a very long username string (100+ characters)
    const longUsername = 'a'.repeat(100);
    await usernameField.fill(longUsername);
    await expect(usernameField).toHaveValue(longUsername);
    
    // Enter valid password
    await passwordField.fill('Learning@830$3mK2');
    
    // Check terms checkbox
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
    
    // Click Sign In
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Login should fail (invalid username) - page remains on login page
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  });

  test('Password field masks input correctly', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const passwordField = page.getByRole('textbox', { name: 'Password:' });
    
    // Click on password field to focus
    await passwordField.click();
    
    // Type password characters
    await passwordField.type('TestPassword123');
    
    // Verify password field is of type 'password' (masking)
    await expect(passwordField).toHaveAttribute('type', 'password');
  });

  test('Form validates basic HTML5 constraints', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const usernameField = page.getByRole('textbox', { name: 'Username:' });
    
    // Fields should be text input type
    await expect(usernameField).toHaveAttribute('type', 'text');
    
    // Fields should be focusable
    await usernameField.focus();
    await expect(usernameField).toBeFocused();
  });
});
