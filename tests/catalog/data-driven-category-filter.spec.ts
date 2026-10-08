import { test, expect } from '../fixtures/test.fixture';
import { loadJsonTestData } from '../utils/test-data';
import type { ProductCategory } from '../types/product';

type CategoryCase = {
  category: ProductCategory;
  expectedProductCount: number;
};

const categoryCases = loadJsonTestData<CategoryCase[]>('product-categories.json');

test.describe('Data-driven category filtering', () => {
  test('Filter the DemoBlaze catalog for every category configured in JSON data', async ({ homePage }) => {
    // 1. Navigate to the home page and verify the default product grid is visible.
    await homePage.goto();
    await expect(homePage.productCards.first()).toBeVisible();

    for (const categoryCase of categoryCases) {
      // 2. Select this JSON-defined category and verify its expected product count.
      await homePage.selectCategory(categoryCase.category);
      await expect(homePage.productCards).toHaveCount(categoryCase.expectedProductCount);

      // 3. Return to the default catalog so the next category starts cleanly.
      await homePage.goto();
    }

    await expect(homePage.productCards).toHaveCount(9);
  });
});
