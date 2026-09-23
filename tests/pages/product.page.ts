import { Page } from '@playwright/test';
import { appConfig } from '../config/app.config';

export class ProductPage {
  readonly productName = this.page.locator('#tbodyid h2.name');
  readonly price = this.page.locator('#tbodyid h3.price-container');
  readonly description = this.page.locator('#tbodyid #more-information');
  readonly addToCartButton = this.page.getByRole('link', { name: 'Add to cart' });

  constructor(readonly page: Page) {}

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
