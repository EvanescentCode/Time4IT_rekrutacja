import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: /e-mail/ });
    this.passwordInput = page.getByLabel(/haslo/);
    this.submitButton = page.getByRole('button', { name: /zaloguj/ });
  }

  async open(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).not.toHaveURL(/\/login/i);
  }
}
