import { expect, Page } from '@playwright/test';

export class CheckoutPage {
  readonly modal = this.page.locator('#orderModal');
  readonly name = this.modal.locator('#name');
  readonly country = this.modal.locator('#country');
  readonly city = this.modal.locator('#city');
  readonly creditCard = this.modal.locator('#card');
  readonly month = this.modal.locator('#month');
  readonly year = this.modal.locator('#year');
  readonly purchaseButton = this.modal.getByRole('button', { name: 'Purchase' });
  readonly closeButton = this.modal.getByRole('button', { name: 'Close' }).last();
  readonly confirmation = this.page.locator('.sweet-alert');

  constructor(readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
    await expect(this.modal).toBeVisible();
  }

  async fill(data: {
    name: string;
    country: string;
    city: string;
    creditCard: string;
    month: string;
    year: string;
  }): Promise<void> {
    await this.name.fill(data.name);
    await this.country.fill(data.country);
    await this.city.fill(data.city);
    await this.creditCard.fill(data.creditCard);
    await this.month.fill(data.month);
    await this.year.fill(data.year);
  }

  async purchase(): Promise<void> {
    await expect(this.modal).toBeVisible();
    await expect(this.purchaseButton).toBeVisible();
    await this.purchaseButton.click({ force: true });
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await expect(this.modal).toBeHidden();
  }
}
