import React, { useCallback } from "react";
import Cell from "../cells/index.js";
import { SETTING_GAME } from "../../utils/common.js";
import { useSelector } from 'react-redux'
import { HandlWinnerActions } from "../../gameplayLoop/winner.js";

const Board = () => {

  const { currentRow, currentColumn } = useSelector((state) => state.board);
  HandlWinnerActions(currentRow, currentColumn);

  const renderColumns =
    (row) => {
      const newColumnInLastRow = Array.from({
        length: SETTING_GAME.Board.Columns,
      }).map((_, index) => {
        return (
          <Cell
            row={row}
            column={index}
            key={index}
          />
        );
      });

      return newColumnInLastRow;
    };

  const renderRows = useCallback(() => {
    return Array.from({ length: SETTING_GAME.Board.Rows }).map((_, index) => {
      return (
        <div className="board-row" key={index}>
          {renderColumns(index)}
        </div>
      );
    });
  });

  return <div className="ttt-board">{renderRows()}</div>;
};

export default Board;
