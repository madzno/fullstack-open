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
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm
