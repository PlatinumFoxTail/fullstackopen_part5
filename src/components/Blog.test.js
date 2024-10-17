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

  render(<Blog blog={blog} />)

  const elementTitleAuthor = screen.getByText('Blogs 101 Billy Blog')
  expect(elementTitleAuthor).toBeDefined()

  expect(screen.queryByText('www.blogs101.com')).toBeNull()
  expect(screen.queryByText('100 likes')).toBeNull()
})