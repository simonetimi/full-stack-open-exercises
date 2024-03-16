import { test, expect, beforeEach, describe, beforeAll } from '@playwright/test';
import { afterEach } from 'node:test';

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('api/testing/reset');
    await request.post('api/users', {
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

describe('When logged in', () => {
  beforeAll(async ({ request }) => {
    await request.post('api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Simone',
        username: 'Nit',
        password: 'prova',
      },
    });
    await request.post('/api/users', {
      data: {
        name: 'Marco',
        username: 'Marc11',
        password: 'prova',
      },
    });
  });
  beforeEach(async ({ page, request }) => {
    await page.goto('/');
    await page.getByLabel('Username:').fill('Nit');
    await page.getByLabel('Password:').fill('prova');
    await page
      .getByRole('button', {
        name: /login/i,
      })
      .click();
  });

  test('a new blog can be created', async ({ page }) => {
    await page
      .getByRole('button', {
        name: /add new blog/i,
      })
      .click();
    await page.getByRole('textbox', { name: /title:/i }).fill('First');
    await page.getByRole('textbox', { name: /author:/i }).fill('Author');
    await page.getByRole('textbox', { name: /url:/i }).fill('Url');
    await page.getByRole('button', { name: /new blog/i }).click();

    await expect(page.getByText(/first/i)).toBeVisible();
    await page.getByRole('button', { name: /show more/i }).click();
  });

  test('a blog can be edited incrementing likes', async ({ page }) => {
    await page
      .getByRole('button', {
        name: /add new blog/i,
      })
      .click();
    // create the entry
    await page.getByRole('textbox', { name: /title:/i }).fill('Second');
    await page.getByRole('textbox', { name: /author:/i }).fill('Author');
    await page.getByRole('textbox', { name: /url:/i }).fill('Url');
    await page.getByRole('button', { name: /new blog/i }).click();

    const secondBlog = page.getByText(/second/i);

    await expect(secondBlog).toBeVisible();

    // expand
    await secondBlog.getByRole('button', { name: /show more/i }).click();

    // click like button
    await page
      .getByText(/second/i)
      .getByRole('button', { name: /like/i })
      .click();

    // likes should be visible: 1
    await expect(page.getByText(/likes: 1/i)).toBeVisible();

    // click again, increments
    await page
      .getByText(/second/i)
      .getByRole('button', { name: /like/i })
      .click();
    await expect(page.getByText(/likes: 2/i)).toBeVisible();
  });

  test('a blog can be deleted', async ({ page }) => {
    // set accept dialog
    page.on('dialog', (dialog) => dialog.accept());

    //get second blog
    const secondBlog = page.getByText(/second/i);
    await secondBlog.getByRole('button', { name: /show more/i }).click();

    // click delete
    await page
      .getByText(/second/i)
      .getByRole('button', { name: /delete/i })
      .click();

    await expect(secondBlog).not.toBeVisible();
  });

  test('delete button can only be viewed by the user who published the blog', async ({ page }) => {
    // logout
    await page.getByRole('button', { name: /logout/i }).click();

    //login with second user
    await page.getByLabel('Username:').fill('Marc11');
    await page.getByLabel('Password:').fill('prova');
    await page
      .getByRole('button', {
        name: /login/i,
      })
      .click();

    // show more
    await page.getByRole('button', { name: /show more/i }).click();

    // delete shouldn't be visible
    await expect(
      page.getByText(/first/i).getByRole('button', { name: /delete/i })
    ).not.toBeVisible();
  });
});

describe('When sorting', () => {
  beforeAll(async ({ request }) => {
    await request.post('api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Simone',
        username: 'Nit',
        password: 'prova',
      },
    });
  });
  beforeEach(async ({ page, request }) => {
    await page.goto('/');
    await page.getByLabel('Username:').fill('Nit');
    await page.getByLabel('Password:').fill('prova');
    await page
      .getByRole('button', {
        name: /login/i,
      })
      .click();
  });

  test('if sorting will rearrange the order of the blogs by like', async ({ page }) => {
    await page
      .getByRole('button', {
        name: /add new blog/i,
      })
      .click();
    // create 3 entries

    const submitBlog = page.getByRole('button', { name: /new blog/i });
    // first
    await page.getByRole('textbox', { name: /title:/i }).fill('First');
    await page.getByRole('textbox', { name: /author:/i }).fill('Author');
    await page.getByRole('textbox', { name: /url:/i }).fill('Url');
    await submitBlog.click();
    await page.waitForTimeout(500);

    // second
    await page.getByRole('textbox', { name: /title:/i }).fill('Second');
    await page.getByRole('textbox', { name: /author:/i }).fill('Author');
    await page.getByRole('textbox', { name: /url:/i }).fill('Url');
    await submitBlog.click();
    await page.waitForTimeout(500);
    // third
    await page.getByRole('textbox', { name: /title:/i }).fill('Third');
    await page.getByRole('textbox', { name: /author:/i }).fill('Author');
    await page.getByRole('textbox', { name: /url:/i }).fill('Url');
    await submitBlog.click();

    // show more third blog
    await page
      .getByText(/third/i)
      .getByRole('button', { name: /show more/i })
      .click();

    // click like
    await page.getByText(/third/i).getByRole('button', { name: /like/i }).click();

    // click sort
    await page.getByRole('button', { name: /sort by likes/i }).click();
    await page.waitForTimeout(500);

    // select all blogs in make array
    const locateBlogs = page.locator('.blog');
    const arrayOfBlogs = await locateBlogs.evaluateAll((blogs) => blogs.map((n) => n.textContent));

    // find indexes
    const thirdIndex = arrayOfBlogs.findIndex((blog) => blog.includes('Third'));
    const secondIndex = arrayOfBlogs.findIndex((blog) => blog.includes('Second'));

    // compare third (should have more likes and be first, so lower index)
    expect(thirdIndex).toBeLessThan(secondIndex);
  });
});
