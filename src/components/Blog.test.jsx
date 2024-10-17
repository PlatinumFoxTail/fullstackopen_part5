import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

test('renders title and author, but not url or likes', () => {
  const { container } = render(<Blog blog={blog} />)

  const elementTitleAuthor = container.querySelector('.blog-summary')
  expect(elementTitleAuthor).toBeDefined()

  expect(container.querySelector('.blog-url')).toBeNull()
  expect(container.querySelector('.blog-likes')).toBeNull()
})

test('renders url and likes after clicking view button', async () => {
  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(container.querySelector('.blog-url')).toBeDefined()
  expect(container.querySelector('.blog-likes')).toBeDefined()
})