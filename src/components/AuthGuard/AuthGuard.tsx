// import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
// import { config } from '../../utils/config';
// import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../utils/api';

export interface AuthGuardProps {
  children: any;
}

export function AuthGuard(props: AuthGuardProps) {
  const history = useHistory();

  const { error } = useQuery('verifyToken', () => api.get('/auth/verifyToken'));

  if (error) {
    history.replace('/login');
  }

  return props.children;
}
