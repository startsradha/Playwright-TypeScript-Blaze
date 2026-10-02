import {test} from '@playwright/test';
import {GooglePage} from '../pages/googlePage';

test('search google',async ({page})=>
{
  const logingoogle=new GooglePage(page);
  await logingoogle.gotogoogle();
  await logingoogle.search('samsung');

  // Google may block automated requests with an unusual-traffic CAPTCHA instead of showing results.
  const pageText = await page.locator('body').innerText();
  if (/unusual traffic|not a robot/i.test(pageText)) {
    test.fixme(true, 'Google returned an unusual-traffic CAPTCHA, so search results are unavailable.');
  }

  await logingoogle.openSamsungResult();
});