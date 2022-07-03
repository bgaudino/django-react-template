import React from 'react';
import {useNavigate} from 'react-router-dom';

import queryClient from '../api/queryClient';
import {logout, useWhoAmI} from '../api/queries';

export default function Logout() {
  const {data, isLoading} = useWhoAmI();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!data.is_authenticated && !isLoading) {
      navigate('/login');
    }
  });

  React.useEffect(() => {
    logout().then(() => queryClient.invalidateQueries(['whoami']));
  }, []);

  return null;
}
