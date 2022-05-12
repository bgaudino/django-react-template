import React from 'react';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';

import queryClient from '../api/queryClient';
import {logout} from '../api/queries';

export default function Logout() {
  const navigate = useNavigate();
  const logoutMutation = useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['whoami']);
      navigate('/login');
    },
  });

  React.useEffect(() => logoutMutation.mutate(), []);

  return null;
}
