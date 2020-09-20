import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginScreen } from './LoginScreen';
import { useMutation } from 'react-query';
import { Context } from '../../Context';
import { AuthApi, SignInDto } from '../../api';

export function LoginScreenConnector() {
  const history = useHistory();
  const context = useContext(Context);

  const authApi = new AuthApi(context.getApiConfig());

  const [signIn, signInResponse] = useMutation(async (data: SignInDto) =>
    authApi.signIn(data)
  );

  if (signInResponse.data) {
    context.setAccessToken(signInResponse.data.accessToken);
    history.replace('/dashboard');
  }

  return <LoginScreen onSubmit={(values) => signIn(values)} />;
}
