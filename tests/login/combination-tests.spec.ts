// spec: tests/login-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Combination Testing - Role and Occupation', () => {
  test('Login with Admin role and Teacher occupation', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Verify Admin role is selected (default)
    const adminRadio = page.getByRole('radio', { name: 'Admin' });
    await expect(adminRadio).toBeChecked();
    
    // Select Teacher from occupation dropdown
    const occupationDropdown = page.getByRole('combobox');
    await occupationDropdown.selectOption('Teacher');
    await expect(occupationDropdown).toHaveValue('Teacher');
    
    // Enter username
    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
    
    // Enter password
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');
    
    // Check terms checkbox
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
    
    // Click Sign In
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify login succeeds
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    await expect(page).toHaveTitle('ProtoCommerce');
  });

  test('Login with User role and Consultant occupation', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Click User role radio button
    const userRadio = page.getByRole('radio', { name: 'User' });
    await userRadio.click();
    
    // Confirm dialog
    await page.getByRole('button', { name: 'Okay' }).click();
    
    // Verify User role is selected
    await expect(userRadio).toBeChecked();
    
    // Select Consultant from occupation dropdown
    const occupationDropdown = page.getByRole('combobox');
    await occupationDropdown.selectOption('Consultant');
    await expect(occupationDropdown).toHaveValue('Consultant');
    
    // Enter username
    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
    
    // Enter password
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');
    
    // Check terms checkbox
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
    
    // Click Sign In
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify login succeeds
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    await expect(page).toHaveTitle('ProtoCommerce');
  });
});
