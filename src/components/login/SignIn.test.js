import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SignIn from './SignIn';

// mock FormData
global.FormData = jest.fn(() => ({
  get: jest.fn().mockReturnValue('test-value'),
}));

describe('<SignIn />', () => {
  it('renders the SignIn component', () => {
    render(<SignIn />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Remember me')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account? Sign Up")).toBeInTheDocument();
  });

});
