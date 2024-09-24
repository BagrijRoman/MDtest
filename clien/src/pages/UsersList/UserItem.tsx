import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const UserItem = (props: any) => {
  const navigate = useNavigate();
  const { firstName, lastName } = props.user.user;
  const userName = `${firstName} ${lastName}`;
  const onClick = () => navigate(`/user/${props.user.user._id}`);

  return (
    <ListGroup.Item action onClick={onClick}>
      {userName}
    </ListGroup.Item>
  );
}

export default UserItem;
