import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  useEffect(() => {
    // fetch user data
    // setUser(data)
  }, [id]);

  return (
    <div>
      {id}
      {user && (
        <>
          <h1>{'user.name'}</h1>
          <p>{'user.country'}</p>
        </>
      )}
    </div>
  )
}

export default User;
