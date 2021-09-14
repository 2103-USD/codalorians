import React, { useState, useEffect } from "react";
import { getUsersList } from "./api/index";

const AllUsers = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(
    () =>
      getUsersList()
        .then((data) => setUsersList(data))
        .catch((error) => console.error(error)),
    []
  );
    console.log(userList);
  return (<>
  
  </>);
};

export default AllUsers;
