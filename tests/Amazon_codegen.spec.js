import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).click();
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).press('CapsLock');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('G');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).press('CapsLock');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('Gt650 ');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).press('CapsLock');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('Gt650 A');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).press('CapsLock');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('Gt650 Accessories');
  await page.getByRole('button', { name: 'Go', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Royal Enfield 1990413 Short' }).click();
  const page1 = await page1Promise;
  await expect(page1.locator('#title')).toContainText('Royal Enfield 1990413 Short Flyscreen, Procured Kit for Interceptor 650/Continental GT 650');
  await page1.getByRole('button', { name: 'Add to cart', exact: true }).click();
  await page1.getByRole('link', { name: 'item in cart' }).click();
  await expect(page1.getByLabel('Shopping Cart', { exact: true })).toContainText('₹1,750.00');
  await expect(page1.getByLabel('Shopping Cart', { exact: true }).locator('h3')).toContainText('Royal Enfield 1990413 Short Flyscreen, Procured Kit for Interceptor 650/Continental GT 650');
  await expect(page1.locator('fieldset[name="sc-quantity"]')).toContainText('1');
  await page1.locator('#sc-subtotal-amount-activecart').getByText('₹1,750.00').click();
  await expect(page1.locator('#sc-subtotal-amount-activecart')).toContainText('₹1,750.00');
  await page1.getByRole('button', { name: 'Proceed to Buy Buy Amazon' }).click();
  await page1.getByRole('heading').waitFor();
  await expect(page1.getByRole('heading')).toContainText('Sign in or create account');
});