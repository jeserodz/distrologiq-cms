import React, { useContext } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { useQuery } from 'react-query';
import { UsersScreen } from './UsersScreen';
import { UsersApi, User } from '../../api';
import { Context } from '../../Context';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';

export function UsersScreenConnector(props: RouteComponentProps) {
  const navigate = useNavigate();
  const context = useContext(Context);
  const usersApi = new UsersApi(context.getApiConfig());

  const getUsersResponse = useQuery(['getUsers'], (key) => usersApi.getUsers());

  function handleUserPress(user: User) {
    navigate(`./users/${user.id}`);
  }

  function handleCreatePress() {
    navigate(`./users/new`);
  }

  return getUsersResponse.data ? (
    <UsersScreen
      users={getUsersResponse.data}
      onUserPress={handleUserPress}
      onCreatePress={handleCreatePress}
    />
  ) : (
    <LoadingOverlay />
  );
}
