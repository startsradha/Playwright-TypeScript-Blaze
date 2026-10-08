import { Locator, Page } from '@playwright/test';
import { appConfig } from '../config/app.config';
import { BasePage, type NavigationOptions } from './base.page';

export class ProductPage extends BasePage {
  readonly productName: Locator;
  readonly price: Locator;
  readonly description: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('#tbodyid h2.name');
    this.price = page.locator('#tbodyid h3.price-container');
    this.description = page.locator('#tbodyid #more-information');
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
  }

  protected override get readyLocator(): Locator {
    return this.productName;
  }

  async gotoWithId(id: string, options?: NavigationOptions): Promise<void> {
    await this.navigateTo(`${appConfig.baseUrl}/prod.html?idp_=${encodeURIComponent(id)}`, options);
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
