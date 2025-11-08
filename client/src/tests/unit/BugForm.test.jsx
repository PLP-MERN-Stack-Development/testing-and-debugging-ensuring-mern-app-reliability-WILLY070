import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../components/BugForm';
import * as api from '../services/api';

jest.mock('../services/api');

test('shows validation error when title is empty', () => {
  render(<BugForm onCreated={() => {}} />);
  fireEvent.click(screen.getByText(/Report Bug/i));
  expect(screen.getByRole('alert')).toHaveTextContent(/Title required/);
});

test('submits data and calls onCreated', async () => {
  api.createBug.mockResolvedValue({ data: { _id: '1', title: 'a' } });
  const onCreated = jest.fn();
  render(<BugForm onCreated={onCreated} />);
  fireEvent.change(screen.getByPlaceholderText(/Title/), { target: { value: 'Bug example' } });
  fireEvent.click(screen.getByText(/Report Bug/i));
  // await DOM update: since we don't wait on a resolved element, use a small timer
  await new Promise(r => setTimeout(r, 0));
  expect(onCreated).toHaveBeenCalled();
});
