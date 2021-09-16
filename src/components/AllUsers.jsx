import React, { useState, useEffect } from "react";
import { getUsersList } from "./api/index";
import { UsersCard, PaginationComponent } from "./";

const AllUsers = (props) => {
  const [usersList, setUsersList] = useState([]);
  const { currentUser } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(4);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    if (currentUser.isadmin)
      getUsersList(currentUser)
        .then((data) => setUsersList(data))
        .catch((error) => console.error(error));
  }, []);

  const totalUsers = usersList.length;
  const lastUserIdx = currentPage * usersPerPage;
  const firstUserIdx = lastUserIdx - usersPerPage;
  const currentUsers = usersList.slice(firstUserIdx, lastUserIdx);

  return (
    <div style={{ display: "block" }}>
      <PaginationComponent
        max={usersPerPage}
        total={totalUsers}
        paginate={paginate}
      />
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        {currentUsers.map((user, index) => {
          return <UsersCard key={user.id} user={user} index={index} />;
        })}
      </div>
    </div>
  );
};

export default AllUsers;
