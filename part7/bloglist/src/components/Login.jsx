import PropTypes from 'prop-types';
import { Input, Button } from '@nextui-org/react';

export const Login = ({
  username,
  password,
  handleOnChangeUsername,
  handleOnChangePassword,
  handleOnLogin,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <label htmlFor="username">
        Username:
        <Input
          id="username"
          type="text"
          minLength="3"
          onChange={handleOnChangeUsername}
          value={username}
        />
      </label>
      <label htmlFor="pass">
        Password:
        <Input
          id="pass"
          type="password"
          minLength="3"
          onChange={handleOnChangePassword}
          value={password}
        />
      </label>
      <Button color="primary" type="button" onClick={handleOnLogin}>
        Login
      </Button>
    </div>
  );
};

Login.propTypes = {
  handleOnLogin: PropTypes.func.isRequired,
  handleOnChangeUsername: PropTypes.func.isRequired,
  handleOnChangePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
