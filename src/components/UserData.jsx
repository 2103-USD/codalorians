import React, { useEffect, useState } from "react";
import { getUser } from "./api";

const UserData = ({ currentUser }) => {
  // const [usersData, setUsersData] = useState("");
  // useEffect(() => {
  //   getUser()
  //     .then((user) => {})
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [currentUser]);

  const { username, email, firstName, lastName } = currentUser;

  return (
    <div>
      <h1> {username?.toUpperCase()}'s Data</h1>
      <p> Username: {username}</p>
      <p> Email: {email}</p>
      <p> First Name: {firstName?.toUpperCase()}</p>
      <p> Last Name: {lastName?.toUpperCase()}</p>
    </div>
  );
};
export default UserData;
