import { render, screen } from '@testing-library/react';
import NewBlog from './NewBlog';
import userEvent from '@testing-library/user-event';

test('should check if the handler gets called with the right data from forms', async () => {
  const handleOnSubmitNewBlog = vi.fn();
  const { getByLabelText, getByText } = render(
    <NewBlog
      token={'token'}
      setMessage={vi.fn()}
      setBlogs={vi.fn()}
      blogs={[]}
      userId="id"
      submitForm={handleOnSubmitNewBlog}
    />
  );

  const user = userEvent.setup();

  const titleInput = getByLabelText('Title:');
  const authorInput = getByLabelText('Author:');
  const urlInput = getByLabelText('Url:');
  const submitButton = getByText('New blog');

  await userEvent.type(titleInput, 'Test Title');
  await userEvent.type(authorInput, 'Test Author');
  await userEvent.type(urlInput, 'Url');

  await user.click(submitButton);
  expect(handleOnSubmitNewBlog).toHaveBeenCalledWith(
    expect.objectContaining({
      title: 'Test Title',
      author: 'Test Author',
      url: 'Url',
      user: 'id',
    })
  );
});
