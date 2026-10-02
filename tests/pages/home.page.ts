import { expect, type Page } from '@playwright/test';
import { appConfig } from '../config/app.config';

export class HomePage {
  readonly productCards: ReturnType<Page['locator']>;

  constructor(readonly page: Page) {
    this.productCards = this.page.locator('#tbodyid .card');
  }

  async goto(): Promise<void> {
    await this.page.goto(appConfig.baseUrl);
    await expect(this.productCards.first()).toBeVisible();
  }

  async loginWithProvidedCredentials(): Promise<void> {
    await this.page.getByRole('link', { name: 'Log in' }).click();
    const dialog = this.page.locator('#logInModal');
    await expect(dialog).toBeVisible();
    await dialog.locator('#loginusername').fill(appConfig.credentials.username);
    await dialog.locator('#loginpassword').fill(appConfig.credentials.password);

    const loginAlert = this.page.waitForEvent('dialog', { timeout: 5000 }).catch(() => undefined);
    await dialog.getByRole('button', { name: 'Log in' }).click();
    const alert = await loginAlert;
    if (alert) await alert.accept();
  }

  async selectCategory(category: 'Phones' | 'Laptops' | 'Monitors'): Promise<void> {
    await this.page.getByRole('link', { name: category }).click();
    await expect(this.productCards.first()).toBeVisible();
  }

  async openProduct(name: string): Promise<void> {
    await this.productCards.filter({ hasText: name }).getByRole('heading', { name }).click();
  }
}
