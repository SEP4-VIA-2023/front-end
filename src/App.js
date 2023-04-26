import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders the home page by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders the login page when the path is /login', () => {
    render(
      <BrowserRouter initialEntries={['/login']}>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});
