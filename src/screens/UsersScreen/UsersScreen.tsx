import React from "react";
import { Paper, Table, TableHead, Typography } from "@material-ui/core";
import { TableRow, TableCell, TableBody } from "@material-ui/core";
import { renderRoles } from "../../utils/render-roles";
import { User } from "distrologiq-sdk";

export interface UsersScreenProps {
  users: User[];
  onUserPress: (user: User) => void;
  onCreatePress: () => void;
}

export function UsersScreen(props: UsersScreenProps) {
  return (
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
            {props.users.map((user) => (
              <TableRow
                hover
                key={user.id}
                onClick={() => props.onUserPress(user)}
              >
                <TableCell>{user.displayName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{renderRoles(user)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
