import React, { useContext } from 'react';
import { RouteComponentProps, useNavigate, useParams } from '@reach/router';
import { useQuery, useMutation } from 'react-query';
import { Toaster } from '../../utils/toaster';
import { UserScreen } from './UserScreen';
import { UsersApi, CreateUserDTO, User, UpdateUserDTO } from '../../api';
import { Context } from '../../Context';

export function UserScreenConnector(props: RouteComponentProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(Context);
  const usersApi = new UsersApi(context.getApiConfig());

  const getUser = useQuery([`getUser ${id}`], () => usersApi.getUser(id), {
    enabled: id !== 'new',
  });

  async function handleCreate(values: CreateUserDTO) {
    try {
      const user = await usersApi.createUser(values);
      Toaster.show('success', 'Usuario creado.');
      navigate(`/dashboard/users/${user.id}`, { replace: true });
    } catch (error) {
      Toaster.show('error', (await error.json()).message);
    }
  }

  async function handleUpdate(data: UpdateUserDTO) {
    try {
      if (!getUser.data) return;
      await usersApi.updateUser(getUser.data.id, data);
      Toaster.show('success', 'Usuario actualizado.');
      getUser.refetch();
    } catch (error) {
      Toaster.show('error', (await error.json()).message);
    }
  }

  return id === 'new' || getUser.data ? (
    <UserScreen
      user={getUser.data}
      onSubmit={(data) =>
        getUser.data ? handleUpdate(data) : handleCreate(data)
      }
      onAnalyticsClick={(user) => {
        navigate(`/dashboard/users/${user.id}/analytics`);
      }}
    />
  ) : null;
}
