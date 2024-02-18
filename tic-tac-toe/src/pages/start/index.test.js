
// Counter.test.js
import React from 'react';
import { getByText, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';

const { PrimaryTicTacToe } = composeStories(stories);

describe("test", () => {
  test('renders the Counter component', async () => {
    await render(<PrimaryTicTacToe />);
    screen.logTestingPlaygroundURL();
    const countElement = screen.getByText(/The turn goes to ../i);
    expect(countElement).toBeInTheDocument();
  });
});


