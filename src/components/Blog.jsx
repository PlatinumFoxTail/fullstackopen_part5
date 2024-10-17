import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showDeleteButton = blog.user && user && blog.user.username === user.username

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-summary">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div className="blog-details">
          <p className="blog-url">{blog.url}</p>
          <p className="blog-likes">
            {blog.likes} likes
            <button onClick={() => handleLike(blog)}>like</button>
          </p>
          <p>{blog.user ? blog.user.name : 'undefined user'}</p>
          {showDeleteButton && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog