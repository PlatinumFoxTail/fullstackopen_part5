import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but not url or likes', () => {
  const blog = {
    title: 'Blogs 101',
    author: 'Billy Blog',
    url: 'www.blogs101.com',
    likes: 100,
    user: {
      username: 'backtobasicblogs',
      name: 'Average Joe',
    },
  }

  const { container } = render(<Blog blog={blog} />)

  const elementTitleAuthor = container.querySelector('.blog-summary')
  expect(elementTitleAuthor).toBeDefined()

  expect(container.querySelector('.blog-url')).toBeNull()
  expect(container.querySelector('.blog-likes')).toBeNull()
})