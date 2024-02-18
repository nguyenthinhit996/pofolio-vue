import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import TicTacToe from "../pages/start";
import About from "../pages/about";


const RouterManagement = () =>
    < Routes >
        <Route path="/" element={<TicTacToe />} />
        <Route path="play" element={<TicTacToe />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<About />} />
    </Routes >;
;

export default RouterManagement;