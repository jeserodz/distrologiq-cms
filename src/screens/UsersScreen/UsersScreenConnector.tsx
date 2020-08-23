import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { UsersScreen } from "./UsersScreen";
import { useQuery } from "react-query";
import { User, UsersApi } from "distrologiq-sdk";
import { AuthContext } from "../../contexts/AuthContext";
import { config } from "../../utils/config";

export function UsersScreenConnector() {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);

  const usersApi = new UsersApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  const { data: users } = useQuery("fetchUsers", () =>
    usersApi.usersControllerIndex()
  );

  function handleUserPress(user: User) {
    history.push(`${location.pathname}/${user.id}`);
  }

  function handleCreatePress() {
    history.push(`${location.pathname}/new`);
  }

  return users ? (
    <UsersScreen
      users={users}
      onUserPress={handleUserPress}
      onCreatePress={handleCreatePress}
    />
  ) : null;
}
