import React, { useContext } from "react";
import { useHistory, useParams } from "react-router";
import { useQuery, useMutation } from "react-query";
import { Toaster } from "../../utils/toaster";
import { UserScreen } from "./UserScreen";
import { UserForm } from "./UserScreen.form";
import { UsersApi, CreateUserDTO, User } from "../../api";
import { Context } from "../../Context";

export function UserScreenConnector() {
  const history = useHistory();
  const context = useContext(Context);
  const usersApi = new UsersApi(context.getApiConfig());
  const { id } = useParams();

  const getUserResponse = useQuery(["getUser", id], (key, id) =>
    usersApi.getUser(id)
  );

  const [createUser] = useMutation((data: CreateUserDTO) =>
    usersApi.createUser(data)
  );

  const [updateUser] = useMutation((data: any) => usersApi.updateUser(data));

  async function handleCreate(values: UserForm) {
    const user = await createUser(values);
    Toaster.show("success", "Usuario creado.");
    history.replace(`/dashboard/users/${user.id}`);
  }

  async function handleUpdate(data: any) {
    if (!id) return;
    const user = (await updateUser(data)) as User;
    Toaster.show("success", "Usuario actualizado.");
    history.replace(`/dashboard/users/${user.id}`);
  }

  return getUserResponse.data ? (
    <UserScreen
      user={getUserResponse.data}
      onSubmit={(data) =>
        id ? handleUpdate(data as any) : handleCreate(data as any)
      }
      onAnalyticsClick={(user) => {
        console.log(user);
        history.push(`/dashboard/users/${user.id}/analytics`);
      }}
    />
  ) : null;
}
