import React from "react";


const UserData = ({ currentUser }) => {

  const { username, email, firstname, lastname } = currentUser;

  return (
    <>
      <h1> Hi, {username}!</h1>
      <p> Username: {username}</p>
      <p> Email: {email}</p>
      <p> First Name: {firstname}</p>
      <p> Last Name: {lastname}</p>
    </>
  );
};
export default UserData;
