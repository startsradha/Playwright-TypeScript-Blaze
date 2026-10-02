import { Locator, Page } from '@playwright/test';
import { appConfig } from '../config/app.config';

export class ProductPage {
  readonly productName: Locator;
  readonly price: Locator;
  readonly description: Locator;
  readonly addToCartButton: Locator;

  constructor(readonly page: Page) {
    this.productName = page.locator('#tbodyid h2.name');
    this.price = page.locator('#tbodyid h3.price-container');
    this.description = page.locator('#tbodyid #more-information');
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
  }

  async gotoWithId(id: string): Promise<void> {
    await this.page.goto(`${appConfig.baseUrl}/prod.html?idp_=${encodeURIComponent(id)}`);
  }

  async addCurrentProductToCart(): Promise<string> {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.addToCartButton.click();
    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}
