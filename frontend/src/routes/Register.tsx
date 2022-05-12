import React from 'react';
import {useMutation} from 'react-query';
import {useNavigate, Link} from 'react-router-dom';

import {register} from '../api/queries';
import queryClient from '../api/queryClient';

export default function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmation, setConfirmation] = React.useState('');
  const navigate = useNavigate();

  const registerMutation = useMutation(
    () => register(email, password, confirmation),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('whoami');
        navigate('/');
      },
      onError: (error: any) => {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        alert(message);
      },
    }
  );

  return (
    <div className="container">
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerMutation.mutate();
        }}
      >
        <input
          className="u-full-width"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="u-full-width"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="u-full-width"
          type="password"
          placeholder="confirm password"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
        />
        <button className="button-primary u-full-width" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
