import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SignUp from './SignUp';

// mock FormData
global.FormData = jest.fn(() => ({
  get: jest.fn().mockReturnValue('test-value'),
}));

describe('<SignUp />', () => {
  it('renders the SignUp component', () => {
    render(<SignUp />);
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Already have an account? Sign in')).toBeInTheDocument();
  });

});