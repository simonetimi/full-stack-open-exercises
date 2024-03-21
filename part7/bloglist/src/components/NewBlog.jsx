import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, ModalFooter } from '@nextui-org/react';

const NewBlog = ({ token, addBlogMutation, userId, submitForm, onClose }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    user: userId,
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleOnSubmitNewBlog = async (event) => {
    event.preventDefault();
    addBlogMutation.mutate({
      newBlog,
      token,
    });
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 my-4"
        onSubmit={
          submitForm ? () => submitForm(newBlog) : handleOnSubmitNewBlog
        }
      >
        <label>
          Title:{' '}
          <Input
            className="w-60"
            type="text"
            name="title"
            onChange={handleOnChange}
          ></Input>
        </label>
        <label>
          Author:{' '}
          <Input
            className="w-60"
            type="text"
            name="author"
            onChange={handleOnChange}
          ></Input>
        </label>
        <label>
          Url:{' '}
          <Input
            className="w-60"
            type="text"
            name="url"
            onChange={handleOnChange}
          ></Input>
        </label>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose} type="submit">
            Add New Blog
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

NewBlog.propTypes = {
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  submitForm: PropTypes.func,
};

export default NewBlog;
