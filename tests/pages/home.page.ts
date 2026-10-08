import { expect, type Locator, type Page } from '@playwright/test';
import { appConfig } from '../config/app.config';
import type { ProductCategory } from '../types/product';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.productCards = page.locator('#tbodyid .card');
  }

  protected override get readyLocator(): Locator {
    return this.productCards.first();
  }

  async goto(): Promise<void> {
    await this.navigateTo(appConfig.baseUrl);
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

  async selectCategory(category: ProductCategory): Promise<void> {
    await this.page.getByRole('link', { name: category }).click();
    await expect(this.productCards.first()).toBeVisible();
  }

  async openProduct(name: string): Promise<void> {
    await this.productCards.filter({ hasText: name }).getByRole('heading', { name }).click();
  }
}
