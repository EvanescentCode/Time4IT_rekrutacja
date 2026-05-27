import { Page, Locator } from '@playwright/test';

export class WaitUtils {
  static async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
  }

  static async waitForUrl(page: Page, url: string): Promise<void> {
    await page.waitForURL(url);
  }
}

export class RandomizeUtils {
  static getRandomNumber(min = 1, max = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getRandomString(length = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  }

  static getRandomEmail(): string {
    return `user_${this.getRandomString(6)}@test.com`;
  }
}

export class StringUtils {
  static capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  static removeWhitespace(text: string): string {
    return text.replace(/\s+/g, '');
  }

  static isNotEmpty(text: string): boolean {
    return text != null && text.length > 0;
  }
}

export class DebugUtils {
  static async takeScreenshot(page: Page, name: string = 'screenshot'): Promise<void> {
    await page.screenshot({
      path: `test-results/${name}-${Date.now()}.png`,
      fullPage: true
    });
  }

  static logUrl(page: Page): void {
    console.log(page.url());
  }
}

export class ElementUtils {
  static async clickAndWait(page: Page, locator: Locator): Promise<void> {
    await locator.click();
    await page.waitForLoadState('networkidle');
  }

  static async fillSlowly(locator: Locator, text: string, delay = 50): Promise<void> {
    for (const char of text) {
      await locator.type(char, { delay });
    }
  }

  static async isVisible(locator: Locator): Promise<boolean> {
    try {
      return await locator.isVisible();
    } catch {
      return false;
    }
  }
}

export class TimeUtils {
  static getTimestamp(): number {
    return Date.now();
  }

  static formatDate(date: Date = new Date()): string {
    return date.toISOString().split('T')[0];
  }
}