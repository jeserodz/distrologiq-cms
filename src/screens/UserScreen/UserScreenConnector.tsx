import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { UserScreen } from './UserScreen';
import { UsersApi, CreateUserDTO } from 'distrologiq-sdk';
import { Toaster } from '../../utils/toaster';
import { config } from '../../utils/config';
import { AuthContext } from '../../contexts/AuthContext';
import { UserForm } from './UserScreen.form';

export function UserScreenConnector() {
  const { id } = useParams();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const usersApi = new UsersApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  const { data: user, isLoading } = useQuery('fetchUser', () =>
    usersApi.usersControllerShow(id)
  );

  const [createUser] = useMutation((data: CreateUserDTO) =>
    usersApi.create(data)
  );

  const [updateUser] = useMutation((data: any) =>
    usersApi.usersControllerUpdate(data, id)
  );

  async function handleCreate(values: UserForm) {
    const user = await createUser(values);
    Toaster.show('success', 'Usuario creado.');
    history.replace(`/dashboard/users/${user.id}`);
  }

  async function handleUpdate(data: any) {
    if (!id) return;
    const user = await updateUser(data);
    Toaster.show('success', 'Usuario actualizado.');
    history.replace(`/dashboard/users/${user.id}`);
  }

  return (
    <UserScreen
      user={user}
      onSubmit={(data) =>
        id ? handleUpdate(data as any) : handleCreate(data as any)
      }
      onAnalyticsClick={(user) => {
        console.log(user);
        history.push(`/dashboard/users/${user.id}/analytics`);
      }}
    />
  );
}
