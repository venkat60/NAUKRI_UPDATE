// spec: tests/login-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Form Interactions and UI Elements', () => {
  test('Cancel User role confirmation dialog', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Verify Admin role is selected by default
    const adminRadio = page.getByRole('radio', { name: 'Admin' });
    await expect(adminRadio).toBeChecked();
    
    // 2. Click User role radio button
    const userRadio = page.getByRole('radio', { name: 'User' });
    await userRadio.click();
    
    // Dialog should appear
    const dialogMessage = page.locator('text=You will be limited to only fewer functionalities of the app');
    await expect(dialogMessage).toBeVisible();
    
    // 3. Click Cancel button
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Verify expectations
    // Dialog closes - message should not be visible
    await expect(dialogMessage).not.toBeVisible();
    // Admin role remains selected
    await expect(adminRadio).toBeChecked();
    // User role is deselected
    await expect(userRadio).not.toBeChecked();
  });

  test('Select different occupations from dropdown', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Verify Student occupation is selected by default
    const occupationDropdown = page.getByRole('combobox');
    await expect(occupationDropdown).toHaveValue('Student');
    
    // Select Teacher from dropdown
    await occupationDropdown.selectOption('Teacher');
    await expect(occupationDropdown).toHaveValue('Teacher');
    
    // Select Consultant from dropdown
    await occupationDropdown.selectOption('Consultant');
    await expect(occupationDropdown).toHaveValue('Consultant');
    
    // Select Student from dropdown
    await occupationDropdown.selectOption('Student');
    await expect(occupationDropdown).toHaveValue('Student');
  });

  test('Terms and conditions checkbox toggle', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const termsCheckbox = page.getByRole('checkbox', { name: 'I Agree to the terms and conditions' });
    
    // Verify checkbox is unchecked by default
    await expect(termsCheckbox).not.toBeChecked();
    
    // Click to check
    await termsCheckbox.click();
    await expect(termsCheckbox).toBeChecked();
    
    // Click to uncheck
    await termsCheckbox.click();
    await expect(termsCheckbox).not.toBeChecked();
    
    // Click to check again
    await termsCheckbox.click();
    await expect(termsCheckbox).toBeChecked();
  });

  test('Terms and conditions link interaction', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Verify terms and conditions link is visible
    const termsLink = page.getByRole('link', { name: 'terms and conditions' });
    await expect(termsLink).toBeVisible();
    
    // Click on the link (it points to '#' so page shouldn't navigate)
    await termsLink.click();
    
    // Verify page remains on login page
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  });
});
