import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableHead,
  Typography,
  Fab,
  Box,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { TableRow, TableCell, TableBody } from "@material-ui/core";
import { renderRoles } from "../../utils/render-roles";
import { User } from "../../api";

export interface UsersScreenProps {
  users: User[];
  onUserPress: (user: User) => void;
  onCreatePress: () => void;
}

export function UsersScreen(props: UsersScreenProps) {
  const [displayAllData, setDisplayAllData] = useState(
    window.innerWidth <= 600 === false
  );

  // Hides table columns when screen resizes
  useEffect(() => {
    function resizeHandler() {
      setDisplayAllData(window.innerWidth <= 600 === false);
    }

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="DashboardScreen UsersScreen">
      <div className="DashboardScreen_Header">
        <Typography variant="h5">Usuarios</Typography>
      </div>
      <Box maxWidth={1600}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                {displayAllData && (
                  <>
                    <TableCell>Email</TableCell>
                    <TableCell>Roles</TableCell>
                  </>
                )}
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
                  {displayAllData && (
                    <>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{renderRoles(user)}</TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Fab
        className="CreateButton"
        color="primary"
        onClick={props.onCreatePress}
      >
        <Add />
      </Fab>
    </div>
  );
}
