import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';
import { SETTING_GAME } from '../../utils/common';

const { PrimaryBoard } = composeStories(stories);

describe("test", () => {
  test('renders the Counter component', () => {
    const { container } = render(<PrimaryBoard />);
    expect(container.firstChild.classList.contains('ttt-board')).toBe(true);
    

    //default 7 row, 7 colum
    const containerEle = container.firstChild;

    expect(containerEle.childNodes.length).toBe(SETTING_GAME.Board.Rows);


  });
});


