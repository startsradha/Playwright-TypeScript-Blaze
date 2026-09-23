import { test, expect } from '../fixtures/test.fixture';

async function expectPurchaseRejected(page: import('@playwright/test').Page, checkoutPage: import('../pages/checkout.page').CheckoutPage): Promise<void> {
  const dialogPromise = page.waitForEvent('dialog', { timeout: 3000 }).then(async (dialog) => {
    const message = dialog.message();
    await dialog.accept();
    return message;
  }).catch(() => undefined);
  await checkoutPage.purchase();
  const message = await dialogPromise;
  if (message) expect(message).toMatch(/fill out|valid|required|incorrect/i);
  await expect(checkoutPage.modal).toBeVisible();
  await expect(checkoutPage.confirmation).toBeHidden();
}

test.describe('Cart and checkout', () => {
  test('Reject incomplete checkout data', { tag: '@regression' }, async ({ homePage, productPage, cartPage, checkoutPage, page }) => {
    // DemoBlaze must not complete an order when required checkout fields are blank.
    await homePage.goto();
    await productPage.gotoWithId('1');
    await expect(productPage.addCurrentProductToCart()).resolves.toContain('Product added');
    await cartPage.goto();
    await checkoutPage.open();
    await expectPurchaseRejected(page, checkoutPage);
  });

  test.fixme('Reject malformed credit-card and date values', async ({ homePage, productPage, cartPage, checkoutPage, page }) => {
    // DemoBlaze currently accepts non-empty malformed values and shows a success confirmation.
    await homePage.goto();
    await productPage.gotoWithId('1');
    await expect(productPage.addCurrentProductToCart()).resolves.toContain('Product added');
    await cartPage.goto();
    await checkoutPage.open();
    await checkoutPage.fill({
      name: 'Radha Bheem Rai',
      country: 'India',
      city: 'Bengaluru',
      creditCard: 'not-a-card',
      month: 'invalid-month',
      year: 'invalid-year',
    });
    await expectPurchaseRejected(page, checkoutPage);
  });
});
