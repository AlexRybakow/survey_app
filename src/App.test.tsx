import { render, screen } from '@testing-library/react';
import App from './App';
import Message from './components/message/message';
import React from 'react';
import userEvent from "@testing-library/user-event"

test('renders toggle button', () => {
  render(<App />);
  const toggleButton = screen.getByText(/Switch mode/i);
  expect(toggleButton).toBeVisible();;
});

test('checks toggle button is active', () => {
  render(<App />);
  const button = screen.getByText(/Switch mode/i);
  expect(button).not.toBeDisabled()
});

test('renders next button', () => {
  render(<App />);
  const button = screen.getByTestId('next-button');
  expect(button).toHaveTextContent('Next');
});

test('check the text of the first question', () => {
  render(<App />);
  const first = screen.getByTestId('question-text');
  expect(first).toHaveTextContent('Who encouraged you to become a developer?');
});

test('check the placeholder', () => {
  render(<App />);
  const placeHolder = screen.getByPlaceholderText('Write answer here');
  expect(placeHolder).toBeInTheDocument();
});

test("stay on the first question if input is empty", () => {
  render(<App/>)
  const first = screen.getByTestId('question-text');
  const button = screen.getByTestId('next-button');
  userEvent.click(button)
  expect(first).toHaveTextContent('Who encouraged you to become a developer?');
})

test("first question is visible by default", () => {
  render(<App/>)
  const first = screen.getByText(/Who encouraged you to become a developer?/i);
  expect(first).toBeVisible();
})

test("alert message is visible if input is empty", () => {
  render(<App/>)
  render(<Message/>)
  const button = screen.getByTestId('next-button');
  const message = screen.getByTestId('message');
  userEvent.click(button)
  expect(message).toBeVisible();
})












