import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { useQuery } from "react-query";
import { UsersScreen } from "./UsersScreen";
import { UsersApi, User } from "../../api";
import { Context } from "../../Context";

export function UsersScreenConnector() {
  const history = useHistory();
  const location = useLocation();
  const context = useContext(Context);
  const usersApi = new UsersApi(context.getApiConfig());

  const getUsersResponse = useQuery(["getUsers"], (key) => usersApi.getUsers());

  function handleUserPress(user: User) {
    history.push(`${location.pathname}/${user.id}`);
  }

  function handleCreatePress() {
    history.push(`${location.pathname}/new`);
  }

  return getUsersResponse.data ? (
    <UsersScreen
      users={getUsersResponse.data}
      onUserPress={handleUserPress}
      onCreatePress={handleCreatePress}
    />
  ) : null;
}
