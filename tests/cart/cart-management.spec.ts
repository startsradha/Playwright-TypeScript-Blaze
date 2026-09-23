import { test, expect } from '../fixtures/test.fixture';

const products = [
  { name: 'Samsung galaxy s6', id: '1', price: 360 },
  { name: 'Nokia lumia 1520', id: '2', price: 820 },
] as const;

test.describe('Cart and checkout', () => {
  test('Add multiple products, verify total, remove one item, and verify recalculation', { tag: '@smoke' }, async ({ homePage, productPage, cartPage }) => {
    // 1. Start from a fresh catalog and add two different products, handling each alert.
    await homePage.goto();
    for (const product of products) {
      await productPage.gotoWithId(product.id);
      await expect(productPage.addCurrentProductToCart()).resolves.toContain('Product added');
    }

    // 2. Open Cart and verify both product rows and their summed total.
    await cartPage.goto();
    await expect(cartPage.productRow(products[0].name)).toHaveCount(1);
    await expect(cartPage.productRow(products[1].name)).toHaveCount(1);
    await expect(cartPage.total).toHaveText(String(products[0].price + products[1].price));

    // 3. Delete one product and verify the remaining row and recalculated total.
    await cartPage.deleteProduct(products[0].name);
    await expect(cartPage.productRow(products[1].name)).toHaveCount(1);
    await expect(cartPage.total).toHaveText(String(products[1].price));

    // 4. Reload the cart and verify the remaining state is retained without duplicates.
    await cartPage.page.reload();
    await expect(cartPage.productRow(products[1].name)).toHaveCount(1);
    await expect(cartPage.total).toHaveText(String(products[1].price));
  });
});
