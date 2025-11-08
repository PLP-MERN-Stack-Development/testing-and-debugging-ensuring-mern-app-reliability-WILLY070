import { render, screen } from '@testing-library/react';
import BugList from '../components/BugList';
import * as api from '../services/api';

jest.mock('../services/api');

test('renders empty state', async () => {
  api.fetchBugs.mockResolvedValue({ data: [] });
  render(<BugList />);
  expect(await screen.findByText(/No bugs reported/i)).toBeInTheDocument();
});

test('renders list when bugs exist', async () => {
  api.fetchBugs.mockResolvedValue({
    data: [{ _id: '1', title: 'a', description: 'd', status: 'open', priority: 'low' }]
  });
  render(<BugList />);
  expect(await screen.findByText('a')).toBeInTheDocument();
});
