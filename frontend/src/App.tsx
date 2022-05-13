import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {useWhoAmI} from './api/queries';

import Home from './routes/Home';
import Login from './routes/Login';
import Logout from './routes/Logout';
import Register from './routes/Register';

function App() {
  const {data, isLoading, error} = useWhoAmI();

  if (isLoading) return null;
  if (error) return <div>Error!</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {data.is_authenticated ? (
          <>
            <Route path="/protected" element={<h1>Protected</h1>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
