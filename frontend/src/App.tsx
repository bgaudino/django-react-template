import React from 'react';
import {useMutation} from 'react-query';

import {useWhoAmI, login, logout} from './api/queries';
import queryClient from './api/queryClient';

function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {data, isLoading, error} = useWhoAmI();

  const loginMutation = useMutation(() => login(email, password), {
    onSuccess: () => {
      console.log('login success');
      queryClient.invalidateQueries(['whoami']);
    },
    onError: () => {
      console.log('login error');
      setEmail('');
      setPassword('');
    },
  });

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      console.log('logout success');
      queryClient.invalidateQueries(['whoami']);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  if (data.is_authenticated)
    return (
      <div>
        <h1>Logged in as {data.email}</h1>
        <button onClick={() => logoutMutation.mutate()}>Logout</button>
      </div>
    );

  return (
    <div>
      <div>Logged Out</div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          loginMutation.mutate();
        }}
      >
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
