import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      blogService.setToken(null)
    } catch (error) {
      console.log(error)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleUserNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <h1>Blog App</h1>

      {!user &&
        <Toggable buttonLabel="log in">
          <LoginForm
            handleLogin={handleLogin}
            handleUserNameChange={handleUserNameChange}
            handlePasswordChange={handlePasswordChange}
            username={username}
            password={password}
          />
        </Toggable>
      }
      {user &&
        < div >
          <p>{user.name} logged in</p>
          <button type="submit" onClick={handleLogOut}>logout</button>
          <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>

          <Toggable buttonLabel='Create New Blog'>
            <BlogForm
              addBlog={addBlog}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
              handleUrlChange={handleUrlChange}
              newTitle={newTitle}
              newAuthor={newAuthor}
              newUrl={newUrl}
            />
          </Toggable>

        </div >
      }
    </div>
  )

}

export default App
