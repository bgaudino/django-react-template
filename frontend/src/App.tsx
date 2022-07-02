import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import {useWhoAmI} from './api/queries';

import Home from './routes/Home';
import Login from './routes/Login';
import Logout from './routes/Logout';
import ScratchPad from './routes/ScratchPad';
import Register from './routes/Register';

function App() {
  const {data, isLoading, error} = useWhoAmI();

  if (isLoading) return null;
  if (error) return <div>Error!</div>;

  return (
    <Router>
      <nav>
        <div
          className="row container"
          style={{display: 'flex', justifyContent: 'flex-end', gap: 20}}
        >
          <Link to="/">Home</Link>
          {data.is_authenticated ? (
            <>
              <Link to="/scratch_pad">Scratch Pad</Link>
              <Link to="/logout">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        {data.is_authenticated ? (
          <>
            <Route path="/scratch_pad" element={<ScratchPad />} />
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
