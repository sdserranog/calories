import React from 'react'
import { render, cleanup } from '@testing-library/react'
import App from '@pages/home'

afterEach(cleanup)

it('should take a snapshot', () => {
  const { container } = render(<App />)

  expect(container.getElementsByClassName('App').length).toBe(1)
})
