import React from "react";
import UserData from "./UserData";
import { Nav } from "react-bootstrap";

const Sidebar = ({currentUser, showSideBar, toggleSideBar}) => {
  const { user } = currentUser;
  return (
    <div
      className={showSideBar ? "sidebar sidebar--expanded" : "sidebar"}
      onClick={toggleSideBar}
    >
      {user ? (
        <>
          {" "}
          <h6>Hello {user.firstname}! </h6>{" "}
          <img src={user.imageurl} height="100px" />{" "}
        </>
      ) : (
        <>
          {" "}
          <h6> Hello Guest! Feel free to browse </h6>{" "}
        </>
      )}
      <Nav.Link>Home</Nav.Link>
      <Nav.Link>Profile</Nav.Link>
      <h6>Admin Functions</h6>
      <Nav.Link href="/AllUsers">Users</Nav.Link>
      <Nav.Link>Products</Nav.Link>
      <span className="shape"></span>
      <span className="shape"></span>
    </div>
  );
};

export default Sidebar;
