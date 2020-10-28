import React, { useContext } from 'react';
import { useNavigate } from '@reach/router';
import { Context } from '../../Context';

interface Props {
  children: React.ReactNode;
  loggedIn?: boolean;
  roles?: [];
  abilities?: [];
  redirectTo?: string;
}

export function AuthGuard(props: Props) {
  const navigate = useNavigate();
  const context = useContext(Context);

  if (props.loggedIn && !context.loggedIn) {
    navigate(props.redirectTo || '/login', { replace: true });
  }

  return <>{props.children}</>;
}
