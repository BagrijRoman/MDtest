import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import UserItem from './UserItem';

import useAllUsers from '../../hook/useAllUsers';

const UsersList = () => {
  const users = useAllUsers();

  return (
    <div className="md-users-list">
      <h4>Users List:</h4>
      {!!users.length && (
        <ListGroup>
          {users.map(user => <UserItem key={user._id} user={user} />)}
        </ListGroup>
      )}
    </div>
  );
}

export default UsersList;
