import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class OrdersListPage extends BasePage {
  readonly heading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /lista zamówień|lista zamowien|zamówienia|zamowienia|orders/i });
    this.searchInput = page.getByRole('textbox', { name: /id|numer|order|search|szukaj/i });
    this.searchButton = page.getByRole('button', { name: /szukaj|search/i });
  }

  async open(): Promise<void> {
    await this.page.goto('/orders');
    await expect(this.heading).toBeVisible();
  }

  async searchByOrderId(orderId: string): Promise<void> {
    await this.searchInput.fill(orderId);

    const visibleSearchButton = this.searchButton.first();
    if ((await this.searchButton.count()) > 0 && (await visibleSearchButton.isVisible())) {
      await visibleSearchButton.click();
      return;
    }

    await this.searchInput.press('Enter');
  }

  async openOrderDetails(orderId: string): Promise<void> {
    const orderRow = this.page.getByRole('row').filter({ hasText: orderId });

    await expect(orderRow).toBeVisible();
    await orderRow.getByRole('link').first().click();
  }
}
