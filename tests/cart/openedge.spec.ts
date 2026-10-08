import {test} from '@playwright/test';

test('Open edge and google',async({browser})=>
{
 const context = await browser.newContext();
 const page=await context.newPage();
 
 await page.goto('https://www.google.com');

 await browser.close();
 
})



// import { chromium } from '@playwright/test';

// (async () => {

//     const browser = await chromium.launch({
//         channel: 'msedge',
//         headless: false
//     });

//     const page = await browser.newPage();

//     await page.goto('https://www.google.com');

//     await page.waitForTimeout(5000);

//     await browser.close();

// })();