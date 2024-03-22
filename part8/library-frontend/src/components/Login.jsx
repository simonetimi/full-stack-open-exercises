const Login = ({ show, login }) => {
  if (!show) {
    return null;
  }

  const onLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={onLogin}>
        <label>Username: </label>
        <input name="username" type="text" />
        <label>Password: </label>
        <input name="password" type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
