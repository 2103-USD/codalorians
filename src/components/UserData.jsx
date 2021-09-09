import React from "react";


const UserData = ({ currentUser }) => {

  const { username, email, firstname, lastname } = currentUser;

  return (
    <div>
      <h1> {username.toUpperCase()}'s Data</h1>
      <p> Username: {username}</p>
      <p> Email: {email}</p>
      <p> First Name: {firstname}</p>
      <p> Last Name: {lastname}</p>
    </div>
  );
};
export default UserData;
