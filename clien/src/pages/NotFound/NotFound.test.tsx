import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import NotFound from './NotFound';

describe('NotFound page renders properly', () => {
  test('Contains "home" hyperlink', () => {
    render(<BrowserRouter><NotFound /></BrowserRouter>);
    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveTextContent('home');
    expect(linkElement).toHaveAttribute('href', '/');
  });

  test('Contains react image', () => {
    render(<BrowserRouter><NotFound /></BrowserRouter>);
    const logo = screen.getByRole('img');

    expect(logo).toMatchSnapshot();
  });
});
