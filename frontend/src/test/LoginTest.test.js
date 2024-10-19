import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from '../pages/SignIn'; // Adjust this path to your actual SignIn component location
 import '@testing-library/jest-dom';


describe('Login Tests', () => {
  const validEmail = 'ka@gmail.com';
  const validPassword = '123';
  
  beforeEach(() => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
  });

  test('TC_1: Valid Login Test', async () => {
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: validEmail } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: validPassword } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(window.location.href).toBe('http://localhost:3000/signin');
    });
  });

  test('TC_2: Invalid Login Test', async () => {
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'ridmmmi@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'ridmi123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    const errorMessage = await screen.findByText(/error message/i); // Update with actual error message text
    expect(errorMessage).toBeInTheDocument();
  });

  test('TC_3: Empty Fields Login Test', async () => {
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    const emailErrorMessage = await screen.findByText(/email is required/i); // Update with actual email error message
    const passwordErrorMessage = await screen.findByText(/password is required/i); // Update with actual password error message

    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });
});
