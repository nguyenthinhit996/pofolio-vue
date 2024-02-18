
// Counter.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories'; 

const { PrimaryAbout } = composeStories(stories);
 
describe("test", () => {
    test('renders the Counter component', () => {
        const { getByText } = render(<PrimaryAbout />);
        
        // Check if the component renders initially with count 0
        const countElement = getByText(/Design/i);
        expect(countElement).toBeInTheDocument();
      });
});


 