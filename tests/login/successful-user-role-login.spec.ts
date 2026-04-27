// spec: tests/login-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication - Happy Path', () => {
  test('Successful login with User role after confirmation', async ({ page }) => {
    // 1. Navigate to the login practice page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // 2. Click on the User role radio button
    await page.getByRole('radio', { name: 'User' }).click();
    
    // Dialog should appear
    await expect(page.locator('text=You will be limited to only fewer functionalities of the app')).toBeVisible();
    
    // 3. Click the Okay button in the dialog
    await page.getByRole('button', { name: 'Okay' }).click();
    
    // Dialog should close and User role should remain selected
    const userRadio = page.getByRole('radio', { name: 'User' });
    await expect(userRadio).toBeChecked();
    
    // 4. Enter username 'rahulshettyacademy'
    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
    
    // 5. Enter password 'Learning@830$3mK2'
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');
    
    // 6. Click the Sign In button
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify expectations
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    await expect(page).toHaveTitle('ProtoCommerce');
  });
});
