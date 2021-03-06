import React from 'react';
import {Link} from 'react-router-dom';

import {useWhoAmI} from '../api/queries';

export default function Home() {
  const {data, isLoading} = useWhoAmI();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Home</h1>
      {data.is_authenticated ? (
        <>
          <p>You are logged in as {data.email}</p>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <>
          <p>You are not logged in.</p>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}
