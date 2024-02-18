import TicTacToe from ".";
import { Provider } from "react-redux";
import { store } from "../../stores/store";


export default {
    title: 'Pages/Board',
    component: TicTacToe,
    decorators: [
        (Story) => (
          <Provider store={store}>
            <Story />
          </Provider>
        ),
      ],
    
};

export const PrimaryTicTacToe={}