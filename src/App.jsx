import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  // fetching blogs if user logged in
  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      ) 
    } 
  }, [user])

  // fetching user from lcoal storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('wrong credentials')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      )}
    </div>
  )

  const handleCreateBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      console.log("Blog created:", returnedBlog)
      setBlogs(blogs.concat(returnedBlog)) //adding new blog

      //success message
      setNotificationMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setNotificationType('success')

      //hiding form after submit
      blogFormRef.current.toggleVisibility()

      //remove notification after 5s
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000)

    } catch (error) {
      console.error(error)
      setNotificationMessage('creating blog did not succeed!')
      setTimeout(() => setNotificationMessage(null), 5000)
      setNotificationType('error')

      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id, 
    }

    console.log('Updated Blog:', updatedBlog)
  
    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(blogliked => (blogliked.id !== blog.id ? blogliked : returnedBlog)))
  
      setNotificationMessage(`One like added to '${blog.title}' by ${blog.author}`)
      setNotificationType('success')
  
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000)
    } catch (error) {
      setNotificationMessage('Adding like to blog failed!')
      setNotificationType('error')
  
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification message={notificationMessage} type={notificationType} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notificationMessage} type={notificationType} />

      <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p> 
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>

      {blogList()}
    </div>
  )
}

export default App
