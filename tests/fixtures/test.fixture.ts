import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

interface Fixtures {
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
}

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
});

export { expect } from '@playwright/test';
