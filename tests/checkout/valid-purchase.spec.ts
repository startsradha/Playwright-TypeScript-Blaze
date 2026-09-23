import { test, expect } from '../fixtures/test.fixture';

test.describe('Cart and checkout', () => {
  test('Complete a purchase with valid checkout data', async ({ homePage, productPage, cartPage, checkoutPage }) => {
    await homePage.goto();
    await productPage.gotoWithId('1');
    await expect(productPage.addCurrentProductToCart()).resolves.toContain('Product added');
    await cartPage.goto();
    await expect(cartPage.productRows).toHaveCount(1);
    await expect(cartPage.total).toHaveText('360');

    await checkoutPage.open();
    await checkoutPage.fill({
      name: 'Radha Bheem Rai',
      country: 'India',
      city: 'Bengaluru',
      creditCard: '4111111111111111',
      month: '09',
      year: '2026',
    });
    await expect(checkoutPage.purchaseButton).toBeEnabled();
    await checkoutPage.purchase();
    await expect(checkoutPage.confirmation).toBeVisible();
    await expect(checkoutPage.confirmation).toContainText('Id:');
    await expect(checkoutPage.confirmation).toContainText('Amount: 360 USD');
    await expect(checkoutPage.confirmation).toContainText('Name: Radha Bheem Rai');
  });
});
