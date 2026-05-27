import { test } from '@playwright/test';
import { LoginPage, OrderDetailsPage, OrdersListPage } from '../../pages';
import { getEnv } from '../../utils/env';

const testData = {
  userEmail: getEnv('TEST_USER_EMAIL'),
  userPassword: getEnv('TEST_USER_PASSWORD'),
  orderId: getEnv('TEST_ORDER_ID'),
  newStatus: getEnv('TEST_ORDER_STATUS'),
};

test.describe('Zamówienia', () => {
  test('zmiana statusu zamówienia i wygenerowanie etykiety', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const ordersListPage = new OrdersListPage(page);
    const orderDetailsPage = new OrderDetailsPage(page);

    await test.step('Logowanie do systemu', async () => {
      await loginPage.open();
      await loginPage.login(testData.userEmail, testData.userPassword);
      await loginPage.expectLoggedIn();
    });

    await test.step('Wejście w listę zamówień', async () => {
      await ordersListPage.open();
    });

    await test.step('Wyszukanie zamówienia po ID', async () => {
      await ordersListPage.searchByOrderId(testData.orderId);
      await ordersListPage.openOrderDetails(testData.orderId);
      await orderDetailsPage.expectOrderDetails(testData.orderId);
    });

    await test.step('Zmiana statusu zamówienia', async () => {
      await orderDetailsPage.changeStatus(testData.newStatus);
      await orderDetailsPage.expectStatusChanged();
    });

    await test.step('Wygenerowanie etykiety i sprawdzenie rezultatu', async () => {
      await orderDetailsPage.generateLabel();
      await orderDetailsPage.expectLabelGenerated();
    });
  });
});
