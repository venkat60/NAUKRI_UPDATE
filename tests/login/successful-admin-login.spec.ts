// spec: tests/login-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication - Happy Path', () => {
  test('Successful login with Admin role and valid credentials', async ({ page }) => {
    // 1. Navigate to the login practice page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // 2. Enter username 'rahulshettyacademy' in the Username field
    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
    
    // 3. Enter password 'Learning@830$3mK2' in the Password field
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');
    
    // 4. Verify Admin role is selected
    const adminRadio = page.getByRole('radio', { name: 'Admin' });
    await expect(adminRadio).toBeChecked();
    
    // 5. Click the Sign In button
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify expectations
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    await expect(page).toHaveTitle('ProtoCommerce');
    
    // Verify navigation and product listings are visible
    await expect(page.getByRole('heading', { name: 'Shop Name', level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Category 1' })).toBeVisible();
  });
});
