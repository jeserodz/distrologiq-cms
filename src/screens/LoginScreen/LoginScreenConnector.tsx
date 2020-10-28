import React, { useContext } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { LoginScreen } from './LoginScreen';
import { useMutation } from 'react-query';
import { Context } from '../../Context';
import { AuthApi, SignInDto } from '../../api';

export function LoginScreenConnector(props: RouteComponentProps) {
  const navigate = useNavigate();
  const context = useContext(Context);

  const authApi = new AuthApi(context.getApiConfig());

  const [signIn] = useMutation(async (data: SignInDto) => {
    const { accessToken } = await authApi.signIn(data);
    context.setAccessToken(accessToken);
    context.setLoggedIn(true);
    context.save();
    navigate('/dashboard', { replace: true });
  });

  return <LoginScreen onSubmit={(values) => signIn(values)} />;
}
