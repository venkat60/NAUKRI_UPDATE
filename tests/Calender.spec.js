const {test,expect} = require("@playwright/test");
 
 
test("Calendar validations",async({page})=>
{
 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("div.react-date-picker__inputGroup").click();  
    await page.locator("button.react-calendar__navigation__label").click();
    await page.locator("button.react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("xpath=//abbr[text()='"+date+"']").click();
    const Calender_value =  page.locator('.react-date-picker__inputGroup input')
    
    for(let i=0;i< expectedList.length ;i++)
    {
        const expectedValue = await Calender_value.nth(i+1).inputValue();
        console.log(expectedValue);
        expect(expectedValue).toEqual(expectedList[i]);
        
    }
});   