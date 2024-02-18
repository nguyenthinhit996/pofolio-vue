import { markStrikeCell, markWinnerFound } from '../stores/slice.js'
import { SETTING_GAME, STRIKE } from '../utils/common.js';
import { handlWinner } from './mathematics.js';
import { useSelector, useDispatch } from 'react-redux'

export const HandlWinnerActions = (row, column) => {
    const board = useSelector((state) => state.board.dataCell);
    if (row !== undefined && column !== undefined) {
        const winningCombinations = handlWinner(board, row, column);
        if (winningCombinations && typeof winningCombinations === "object") {
            //Check winning direction for 4 type up down diagonal line
            Object.keys(winningCombinations).forEach(function (key) {
                if (winningCombinations[key].length >= SETTING_GAME.StrikeNumber) {
                    HandlWinnerAction(winningCombinations[key], STRIKE[key]);
                }
            });
        }
    }
};
export const HandlWinnerAction = (winningArray = [], strike) => {
    const dispatch = useDispatch();
    for (const { row = 0, column = 0 } of winningArray) {
        dispatch(markStrikeCell({ row, column, strike }))
    }
    dispatch(markWinnerFound({ type: true }))
};
