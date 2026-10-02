import { expect, Page } from '@playwright/test';

export class CheckoutPage {
  readonly modal: ReturnType<Page['locator']>;
  readonly name: ReturnType<Page['locator']>;
  readonly country: ReturnType<Page['locator']>;
  readonly city: ReturnType<Page['locator']>;
  readonly creditCard: ReturnType<Page['locator']>;
  readonly month: ReturnType<Page['locator']>;
  readonly year: ReturnType<Page['locator']>;
  readonly purchaseButton: ReturnType<Page['getByRole']>;
  readonly closeButton: ReturnType<Page['locator']>;
  readonly confirmation: ReturnType<Page['locator']>;

  constructor(readonly page: Page) {
    this.confirmation = this.page.locator('.sweet-alert');
    this.modal = this.page.locator('#orderModal');
    this.name = this.modal.locator('#name');
    this.country = this.modal.locator('#country');
    this.city = this.modal.locator('#city');
    this.creditCard = this.modal.locator('#card');
    this.month = this.modal.locator('#month');
    this.year = this.modal.locator('#year');
    this.purchaseButton = this.modal.getByRole('button', { name: 'Purchase' });
    this.closeButton = this.modal.getByRole('button', { name: 'Close' }).last();
  }

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
