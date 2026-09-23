import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('login', async ({ page }) => {
  const loginspec = new LoginPage(page);
  await page.goto('https://demoblaze.com/');
  await page.locator('#login2').click();
  await loginspec.loginb('radhabheemrai24@gmail.com', 'Blaze12!@');
});
