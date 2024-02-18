import Board from ".";
import { Provider } from "react-redux";
import { store } from "../../stores/store";

export default {
    title: 'Component/Board',
    component: Board,
    decorators: [
        (Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export const PrimaryBoard = {}