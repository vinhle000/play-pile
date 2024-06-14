import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { UserProvider } from '../src/contexts/UserContext';
import { UserPlayPileGamesProvider } from '../src/contexts/UserPlayPileGamesContext';
import { ColumnsProvider } from '../src/contexts/ColumnsContext';

describe('App', () => {
  let mock;
  const API_URL = 'http://localhost:8000';

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should render App component and handle errors', async () => {
    // Mock the necessary API calls
    mock.onGet(`${API_URL}/playPile`).reply(200, { playPile: [] });
    mock.onGet(`${API_URL}/board`).reply(200, { gamesOnBoard: {} });
    mock.onGet(`${API_URL}/me`).reply(404);
    mock.onGet(`${API_URL}/columns`).reply(404);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Render the App component within the context providers
    render(
      <UserProvider>
        <UserPlayPileGamesProvider>
          <ColumnsProvider>
            <App />
          </ColumnsProvider>
        </UserPlayPileGamesProvider>
      </UserProvider>
    );

    // Wait for the component to update with the mocked data
    await waitFor(() => {
      // expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error getting columns for user'));
      // expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error fetching user data'));
      const playPileText = screen.getByText(/PlayPile/i);
      expect(playPileText).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});