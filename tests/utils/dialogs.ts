import { Page } from '@playwright/test';

export async function acceptNextDialog(page: Page): Promise<string> {
  const dialog = await page.waitForEvent('dialog');
  const message = dialog.message();
  await dialog.accept();
  return message;
}
