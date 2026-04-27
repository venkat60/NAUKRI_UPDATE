// spec: tests/login-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication - Happy Path', () => {
  test('Successful login without checking terms and conditions checkbox', async ({ page }) => {
    // 1. Navigate to the login practice page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // 2. Enter username 'rahulshettyacademy'
    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
    
    // 3. Enter password 'Learning@830$3mK2'
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');
    
    // 4. Leave terms and conditions checkbox unchecked
    const termsCheckbox = page.getByRole('checkbox', { name: 'I Agree to the terms and conditions' });
    await expect(termsCheckbox).not.toBeChecked();
    
    // 5. Click the Sign In button without checking terms checkbox
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify expectations
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    await expect(page).toHaveTitle('ProtoCommerce');
  });
});
