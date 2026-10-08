import { expect, Locator, Page } from '@playwright/test';
import { appConfig } from '../config/app.config';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly productRows: Locator;
  readonly total: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productRows = page.locator('#tbodyid tr');
    this.total = page.locator('#totalp');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
  }

  protected override get readyLocator(): Locator {
    return this.placeOrderButton;
  }

  async goto(): Promise<void> {
    await this.navigateTo(`${appConfig.baseUrl}/cart.html`);
  }

  productRow(name: string) {
    return this.productRows.filter({ hasText: name });
  }

  async deleteProduct(name: string): Promise<void> {
    const row = this.productRow(name);
    await row.getByRole('link', { name: 'Delete' }).click();
    await expect(row).toHaveCount(0);
  }

  async totalValue(): Promise<number> {
    const value = await this.total.textContent();
    return Number(value?.trim() ?? 0);
  }
}
