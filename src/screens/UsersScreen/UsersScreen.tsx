import React from "react";
import { Paper, Table, TableHead, Typography } from "@material-ui/core";
import { TableRow, TableCell, TableBody } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS, GetUsersData } from "./UsersScreen.graphql";
import { User } from "../../graphql";
import { renderRoles } from "../../utils/render-roles";

export function UsersScreen() {
  const history = useHistory();
  const location = useLocation();
  const { data } = useQuery<GetUsersData>(GET_USERS);

  function handleUserPress(user: User) {
    history.push(`${location.pathname}/${user.id}`);
  }

  return data ? (
    <div className="DashboardScreen UsersScreen">
      <div className="DashboardScreen_Header">
        <Typography variant="h5">Usuarios</Typography>
      </div>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map(user => (
              <TableRow hover key={user.id} onClick={() => handleUserPress(user)}>
                <TableCell>{user.displayName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{renderRoles(user)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  ) : null;
}
