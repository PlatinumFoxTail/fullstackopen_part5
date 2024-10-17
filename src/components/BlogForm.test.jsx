import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calling event handler with right details when creating a new blog', async () => {
  const mockHandler = vi.fn()

  render(
    <BlogForm handleCreateBlog={mockHandler} />
  )

  const user = userEvent.setup()

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')

  await user.type(titleInput, 'Title X')
  await user.type(authorInput, 'Author Y')
  await user.type(urlInput, 'www.xy.com')

  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(mockHandler).toHaveBeenCalledTimes(1)
  expect(mockHandler).toHaveBeenCalledWith({
    title: 'Title X',
    author: 'Author Y',
    url: 'www.xy.com',
  })
})