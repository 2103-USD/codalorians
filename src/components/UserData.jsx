import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-bootstrap";
import { getCurrentUser } from "./auth/auth";

const UserData = () => {
  // const {user } = getCurrentUser();
  // const { firstname, imageurl, email, firstname, lastname, isadmin} = user;
  // return (
  //   <>
  //     <h1> Hi, {firstname}!</h1>
  //     <img src={imageurl} />
  //     <p> Email: {email}</p>
  //     <p> First Name: {firstname}</p>
  //     <p> Last Name: {lastname}</p>
  //     <h6>Admin</h6>
  //     <NavLink>Users</NavLink>
  //     <NavLink>Orders</NavLink>
  //   </>
  // ) : (
  //   <>
  //     <h1> Hi, {firstname}!</h1>
  //     <img src={imageurl} />
  //     <p> Email: {email}</p>
  //     <p> First Name: {firstname}</p>
  //     <p> Last Name: {lastname}</p>
  //   </>
  // );
};

export default UserData;
