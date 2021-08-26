import React from "react";
import Login from "./Login";
import LogoutButton from "./LogoutButton";
import Register from "./Register";
import { NavLink } from "react-router-dom";

const Modal = ({ setCurrentUser, currentUser }) => {
  const { username } = currentUser || {};
  return (
    <div>
      {/*
      !{currentUser} ?
      <>
        <Login setCurrentUser={setCurrentUser} />
        <Register setCurrentUser={setCurrentUser} />
      </>{" "}
      :
      <>
        <h1>Welcome, {username} </h1>
        <NavLink to="/UserData">User Data</NavLink>
        <NavLink to="/cart" currentUser={currentUser}>
          Cart
        </NavLink>
        <NavLink to="/products">Products</NavLink>
        <LogoutButton setCurrentUser={setCurrentUser} />
      </>*/}
    </div>
  );
};

export default Modal;
