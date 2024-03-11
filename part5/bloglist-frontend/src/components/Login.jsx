export const Login = ({
  username,
  password,
  handleOnChangeUsername,
  handleOnChangePassword,
  handleOnLogin,
}) => {
  return (
    <div>
      <label htmlFor="username">
        Username:
        <input
          id="username"
          type="text"
          minLength="3"
          onChange={handleOnChangeUsername}
          value={username}
        />
      </label>
      <label htmlFor="pass">
        Password:
        <input
          id="pass"
          type="password"
          minLength="3"
          onChange={handleOnChangePassword}
          value={password}
        />
      </label>
      <button type="button" onClick={handleOnLogin}>
        Login
      </button>
    </div>
  );
};
