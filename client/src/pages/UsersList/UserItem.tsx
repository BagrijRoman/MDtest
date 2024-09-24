import React from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

import { IUserDetails } from "../../types/IUser";

const UserItem = ({ user }: { user: IUserDetails }) => {
  const navigate = useNavigate();
  const { firstName, lastName } = user;
  const userName = `${firstName} ${lastName}`;
  const onClick = () => navigate(`/user/${user._id}`);

  return (
    <ListGroup.Item action onClick={onClick}>
      {userName}
    </ListGroup.Item>
  );
};

export default UserItem;
