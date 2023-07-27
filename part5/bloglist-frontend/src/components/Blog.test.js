import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'new blog',
    author: 'John Smith'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('new blog', { exact: false })
  expect(element).toBeDefined()
})
