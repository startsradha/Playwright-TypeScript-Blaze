import { test, expect } from '../fixtures/test.fixture';

const categories = [
  { name: 'Phones', expectedProducts: 7 },
  { name: 'Laptops', expectedProducts: 6 },
  { name: 'Monitors', expectedProducts: 2 },
] as const;

test.describe('Catalog and product discovery', () => {
  test('Filter catalog by each product category', { tag: '@sanity' }, async ({ homePage }) => {
    await homePage.goto();
    await homePage.loginWithProvidedCredentials();

    for (const category of categories) {
      await homePage.goto();
      await homePage.selectCategory(category.name);
      await expect(homePage.productCards).toHaveCount(category.expectedProducts);
    }

    await homePage.goto();
    await expect(homePage.productCards).toHaveCount(9);
  });

  test('Open a product and add it to the cart', { tag: '@smoke' }, async ({ homePage, productPage, cartPage }) => {
    await homePage.goto();
    await homePage.loginWithProvidedCredentials();
    await homePage.openProduct('Samsung galaxy s6');
    await expect(productPage.productName).toHaveText('Samsung galaxy s6');
    await expect(productPage.price).toContainText('$360');
    await expect(productPage.description).toBeVisible();
    await expect(productPage.addToCartButton).toBeVisible();

    await expect(productPage.addCurrentProductToCart()).resolves.toContain('Product added');
    await cartPage.goto();
    await expect(cartPage.productRow('Samsung galaxy s6')).toHaveCount(1);
    await expect(cartPage.total).toHaveText('360');
  });

  test('Handle an unavailable or malformed product URL safely', { tag: '@regression' }, async ({ homePage, productPage }) => {
    await productPage.gotoWithId('invalid');
    await expect(productPage.page).toHaveURL(/prod\.html\?idp_=invalid/);

    await homePage.goto();
    await expect(homePage.productCards.first()).toBeVisible();
  });
});
