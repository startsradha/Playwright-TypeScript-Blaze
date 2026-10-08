import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly modal: Locator;
  readonly name: Locator;
  readonly country: Locator;
  readonly city: Locator;
  readonly creditCard: Locator;
  readonly month: Locator;
  readonly year: Locator;
  readonly purchaseButton: Locator;
  readonly closeButton: Locator;
  readonly confirmation: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmation = page.locator('.sweet-alert');
    this.modal = page.locator('#orderModal');
    this.name = this.modal.locator('#name');
    this.country = this.modal.locator('#country');
    this.city = this.modal.locator('#city');
    this.creditCard = this.modal.locator('#card');
    this.month = this.modal.locator('#month');
    this.year = this.modal.locator('#year');
    this.purchaseButton = this.modal.getByRole('button', { name: 'Purchase' });
    this.closeButton = this.modal.getByRole('button', { name: 'Close' }).last();
  }

  protected override get readyLocator(): Locator {
    return this.modal;
  }

  async open(): Promise<void> {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
    await this.waitUntilReady();
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
