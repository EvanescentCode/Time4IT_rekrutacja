import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class OrderDetailsPage extends BasePage {
  readonly statusSelect: Locator;
  readonly saveStatusButton: Locator;
  readonly generateLabelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.statusSelect = page.getByLabel(/status/i);
    this.saveStatusButton = page.getByRole('button', { name: /zapisz|save|zmień status|zmien status/i });
    this.generateLabelButton = page.getByRole('button', { name: /generuj etykietę|generuj etykiete|generate label/i });
  }

  async expectOrderDetails(orderId: string): Promise<void> {
    await expect(this.page.getByText(orderId, { exact: false })).toBeVisible();
  }

  async changeStatus(status: string): Promise<void> {
    await this.statusSelect.selectOption({ label: status });
    await this.saveStatusButton.click();
  }

  async generateLabel(): Promise<void> {
    await this.generateLabelButton.click();
  }

  async expectStatusChanged(): Promise<void> {
    await this.expectNotification(/status.*(zmieniony|zaktualizowany|changed|updated)/i);
  }

  async expectLabelGenerated(): Promise<void> {
    await this.expectNotification(/etykieta.*(wygenerowana|utworzona)|label.*(generated|created)/i);
  }
}
