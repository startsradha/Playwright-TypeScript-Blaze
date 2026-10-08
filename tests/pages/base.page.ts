import { expect, type Locator, type Page } from '@playwright/test';

export interface NavigationOptions {
  waitForReady?: boolean;
}

/**
 * Shared abstraction for page objects and modal objects.
 * Concrete classes provide their own readyLocator; waitUntilReady() uses
 * that overridden getter through polymorphism.
 */
export abstract class BasePage {
  protected constructor(readonly page: Page) {}

  protected abstract get readyLocator(): Locator;

  async waitUntilReady(): Promise<void> {
    await expect(this.readyLocator).toBeVisible();
  }

  protected async navigateTo(url: string, options: NavigationOptions = {}): Promise<void> {
    await this.page.goto(url);
    if (options.waitForReady ?? true) {
      await this.waitUntilReady();
    }
  }
}