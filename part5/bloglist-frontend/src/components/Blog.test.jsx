import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

/*
test('renders blog without url and likes', () => {
  const blog = {
    author: 'Me',
    title: 'This is the title',
    user: { username: 'User' },
  };

  const { container } = render(<Blog blog={blog} username="Nit" />);

  const element = screen.getByText('This is the title');
  const url = container.querySelector('#url');
  const likes = container.querySelector('#likes');

  expect(element).toBeDefined();
  expect(url).toBeNull;
  expect(likes).toBeNull;
});
*/

test('renders blog with url and likes when button is pressed', async () => {
  const blog = {
    author: 'Me',
    title: 'This is the title',
    user: { username: 'User' },
    url: 'http',
    likes: 3,
  };

  render(<Blog blog={blog} username="Nit" />);

  const url = screen.getByText('Blog url: http');
  const likes = screen.getByText('Likes: 3');

  expect(url).not.toBeVisible();
  expect(likes).not.toBeVisible();

  const user = userEvent.setup();
  const showButton = screen.getByText('Show more');
  await user.click(showButton);

  expect(url).toBeVisible();
  expect(likes).toBeVisible();
});
