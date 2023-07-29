const LoginForm = ({
  handleLogin,
  handleUserNameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={handleUserNameChange}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="password"
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </>
  )
}

export default LoginForm
