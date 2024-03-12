import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
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
