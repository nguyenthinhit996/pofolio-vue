import React from "react";

import Board from "../../components/board/index.js";
import TurnTable from "../../components/turnTable/index.js";
import WinnerBoard from "../../components/winnerBoard/index.js";
import { useSelector } from 'react-redux'
import { IMAGE, SETTING_GAME } from "../../utils/common.js";
import classNames from "classnames";

const TicTacToe = () => {

  const winnerFound = useSelector((state) => state.board.winnerFound);
  const rounds = useSelector((state) => state.board.round);
  const isDrawn = rounds === SETTING_GAME.Board.Columns*SETTING_GAME.Board.Rows;

  return (
    <div className="tic-tac-toe">
      <div className="container">
        <Board />
        {(winnerFound || isDrawn) ? (
          <WinnerBoard />
        ) : (
          <TurnTable />
        )}
        <img className={classNames({"ko-show": winnerFound || isDrawn, "ko-hide": !winnerFound && !isDrawn})} src={IMAGE.ko} />
      </div>
    </div>
  );
};

export default TicTacToe;
