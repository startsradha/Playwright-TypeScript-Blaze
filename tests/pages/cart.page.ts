import { expect, Page } from '@playwright/test';
import { appConfig } from '../config/app.config';

export class CartPage {
  readonly productRows;
  readonly total;
  readonly placeOrderButton;

  constructor(readonly page: Page) {
    this.productRows = page.locator('#tbodyid tr');
    this.total = page.locator('#totalp');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
  }

  async goto(): Promise<void> {
    await this.page.goto(`${appConfig.baseUrl}/cart.html`);
    await expect(this.placeOrderButton).toBeVisible();
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
