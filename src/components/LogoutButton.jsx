import React from "react";
import { clearCurrentUser } from "./auth/auth";

const LogoutButton = ({ setCurrentUser }) => {
  function handleLogout() {
    clearCurrentUser();
    setCurrentUser("");
  }

  return (
    <input name="Logout" type="Button" value="Logout" onClick={handleLogout}>
      Logout
    </input>
  );
};

export default LogoutButton;
