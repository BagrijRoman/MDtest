import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hook/useAuth';


const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <p>Hello, { user ? user.name : 'User' }!</p>
      {user ? <div>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="info">Info</Button>
        <Button variant="light">Light</Button>
        <Button variant="dark">Dark</Button>
        <Button variant="link">Link</Button>
      </div> : <p>Please <Link to="/login">authorize</Link></p>}
    </div>
  );
};

export default Home;
