import { test, expect, beforeEach, describe, screen } from '@playwright/test';

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset');
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Simone',
        username: 'Nit',
        password: 'prova',
      },
    });
    await page.goto('/');
  });
  test('front page can be opened', async ({ page }) => {
    const loginInput = page.getByLabel('Username:');
    expect(loginInput).toBeVisible();
  });

  test('user can login', async ({ page }) => {
    await page.getByLabel('Username:').fill('Nit');
    await page.getByLabel('Password:').fill('prova');
    await page
      .getByRole('button', {
        name: /login/i,
      })
      .click();
    await expect(page.getByText(/simone logged in/i)).toBeVisible();
  });
  test('user should see error if fails to login', async ({ page }) => {
    await page.getByLabel('Username:').fill('Nit');
    await page.getByLabel('Password:').fill('wrongpass');
    await page
      .getByRole('button', {
        name: /login/i,
      })
      .click();
    await expect(page.getByText(/request failed with status code 401/i)).toBeVisible();
  });
});
