import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from 'react-redux'
import {openModal, openNavbar} from '../../stores/slice'

const Navbar = () => {
  const burger = "/assets/img/burger-menu.png";
  const dispatch = useDispatch();
  const isOpenNavBar = useSelector((state) => state.board.isOpenNavbar)

  window.addEventListener("click", (e) => {
    if (e.target.className !== "navbar" && e.target.className !== 'burger-bg' && e.target.className !== 'burger') {
      dispatch(openNavbar({isOpen: false}))
    }
  });

  return (
    <div className={`navbar-container  ${classNames({"hide-navbar": !isOpenNavBar, "show-navbar": isOpenNavBar})}`}>
      <div className="navbar">
        <div className="navbar-title">Tic tac Toe</div>
        <div
          className="navbar-item"
          onClick={() => {
            window.open("/play", "_self");
          }}
        >
          {" "}
          <i
            class="fa fa-caret-square-o-right"
          ></i>{" "}
          Start
        </div>
        <div
          className="navbar-item"
          onClick={() => {
            window.open("/about", "_self");
          }}
        >
          <i class="fa fa-address-book-o"></i> About
        </div>
      </div>
      <div className="burger-container" onClick={() => dispatch(openNavbar({isOpen: true}))}>
      <img className="burger" src={burger} />
      <div className="burger-bg"></div>
      </div>
    </div>
  );
};

export default Navbar;
