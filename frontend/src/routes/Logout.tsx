import React from 'react';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';

import queryClient from '../api/queryClient';
import {logout, useWhoAmI} from '../api/queries';

export default function Logout() {
  const {data, isLoading} = useWhoAmI();

  const navigate = useNavigate();
  const logoutMutation = useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['whoami']);
    },
  });

  React.useEffect(() => {
    if (!data.is_authenticated && !isLoading) {
      navigate('/login');
    }
  });

  React.useEffect(() => logoutMutation.mutate(), []);

  return null;
}
