import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginScreen } from './LoginScreen';
import { AuthApi, SignInDto } from 'distrologiq-sdk';
import { useMutation } from 'react-query';
import { AuthContext } from '../../contexts/AuthContext';
import { config } from '../../utils/config';

export function LoginScreenConnector() {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const authApi = new AuthApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  const [signIn, { data }] = useMutation(async (data: SignInDto) =>
    authApi.authControllerSignIn(data)
  );

  if (data) {
    auth.setAccessToken(data.accessToken);
    history.replace('/dashboard');
  }

  // return <LoginScreen onSubmit={(values) => signIn(values)} />;
  return <LoginScreen onSubmit={(values) => signIn(values)} />;
}
