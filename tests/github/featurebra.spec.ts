import { test, expect, type Page } from '@playwright/test';

test('login page title', async ({ page }: { page: Page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
    console.log('User B changed this line');
});