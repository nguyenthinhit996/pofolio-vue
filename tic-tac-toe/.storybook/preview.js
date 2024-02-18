/** @type { import('@storybook/react').Preview } */

import "../src/components/board/style.css";
import "../src/components/turnTable/style.css";
import "../src/pages/start/style.css";
import "../src/pages/about/style.css";
import "../src/components/cells/style.css";
import "../src/components/winnerBoard/style.css";
import "../src/components/navbar/style.css";
import "../src/App.css";
import "../src/index.css";

import { Provider } from "react-redux";
import { store } from '../src/stores/store.js'

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],

};

export default preview;
