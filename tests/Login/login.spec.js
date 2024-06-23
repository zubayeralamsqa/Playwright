const {test,expect}=require('@playwright/test')
const LoginActions = require('./loginActions.js');
const { chromium } = require('playwright');


/*test("valid Login", async function({page}){
    await page.goto("https://www.saucedemo.com/");
    const inputUserName = await page.$('input[placeholder="Username"]');
    const inputPassword = await page.$("input[name='password']");
    const tapLoginButton = await page.$("//input[@id='login-button']");
    await inputUserName?.type('standard_user');
    await inputPassword?.type('secret_sauce');
    await tapLoginButton.click();
    await expect(page).toHaveURL(/inventory/);

})*/
test("valid Login", async ()=>{
    
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginActions = new LoginActions(page);

    await loginActions.loadWebsite();
    await loginActions.enterUsername('standard_user');
    await loginActions.enterPassword('secret_sauce');
    await loginActions.submit();

   // await browser.close();       
      
})
