const {test, expect} = require('@playwright/test');

test('FIRST PW TC', async ({browser, page}) => {
    const productTitles = page.locator('.card-body b');
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    console.log(await page.title());
    // await page.getByText('Register here').click();
    // await page.locator('input#firstName').fill('Pavan');
    // await page.locator('input#lastName').fill('Kalyan1');
    // await page.locator('input#userEmail').fill('pavankalyan@gmail.com');
    // await page.locator('input#userMobile').fill('9161234561');
    // await page.locator('input#userPassword').fill('Venky@916');
    // await page.locator('input#confirmPassword').fill('Venky@916');
    // await page.locator("[type='checkbox']").check();
    // await page.locator("[type='submit']").click();
    // await console.log(page.title());
    // await expect(page.locator('.login-title')).toHaveText('Login');
    await page.locator('#userEmail').fill('pavankalyan@gmail.com');
    await page.locator('#userPassword').fill('Venky@916');
    await page.locator('#login').click();
    //console.log(await productTitles.first().textContent());
    await page.waitForLoadState('networkidle');
    console.log(await productTitles.allTextContents());
    //await expect(page.locator('.card-body b')).toHaveText('ZARA COAT 3');

});
test.only('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
   
   
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 });
     
