import React from 'react';
import {useMutation} from 'react-query';

import queryClient from '../api/queryClient';
import {login} from '../api/queries';
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();

  const loginMutation = useMutation(() => login(email, password), {
    onSuccess: () => {
      queryClient.invalidateQueries(['whoami']);
      navigate('/');
    },
    onError: (e: any) => {
      setEmail('');
      setPassword('');
      setErrorMessage(e.message ?? 'Something went wrong');
    },
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginMutation.mutate();
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
        <button className="button-primary u-full-width" type="submit">Login</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}
