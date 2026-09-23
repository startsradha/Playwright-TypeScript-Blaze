import { test, expect } from '../fixtures/test.fixture';

test.describe('Cart and checkout', () => {
  test('Prevent or safely handle checkout from an empty cart', { tag: '@sanity' }, async ({ page, homePage, cartPage, checkoutPage }) => {
    // 1. Start from a fresh context and navigate directly to an empty cart.
    await cartPage.goto();
    await expect(cartPage.productRows).toHaveCount(0);
    await expect(cartPage.total).toHaveText('');

    // 2. Open Place Order and verify the checkout dialog is usable without completing a purchase.
    await checkoutPage.open();
    await expect(checkoutPage.name).toBeVisible();
    await expect(checkoutPage.purchaseButton).toBeVisible();

    // 3. Close checkout and return to the catalog without an error page.
    await checkoutPage.close();
    await homePage.goto();
    await expect(page).toHaveURL(/demoblaze\.com/);
    await expect(homePage.productCards.first()).toBeVisible();
  });
});
