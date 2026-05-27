import { expect, type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  protected get notification(): Locator {
    return this.page.locator('[role="alert"], .toast, .notification, .alert').last();
  }

  async expectNotification(message: string | RegExp): Promise<void> {
    await expect(this.notification).toContainText(message);
  }
}
