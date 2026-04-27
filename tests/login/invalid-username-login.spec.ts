// spec: tests/login-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication - Negative Testing', () => {
  test('Login with invalid username and valid password', async ({ page }) => {
    // 1. Navigate to the login practice page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // 2. Enter invalid username 'invaliduser'
    await page.getByRole('textbox', { name: 'Username:' }).fill('invaliduser');
    
    // 3. Enter valid password 'Learning@830$3mK2'
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');
    
    // 4. Check terms and conditions checkbox
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
    
    // 5. Click Sign In button
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify expectations - page remains on login page
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  });
});
