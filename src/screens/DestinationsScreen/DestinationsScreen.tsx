import React from 'react';
import { Paper, Table, TableHead, Typography, Fab } from '@material-ui/core';
import { TableRow, TableCell, TableBody } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Destination } from 'distrologiq-sdk';

export interface DestinationsScreenProps {
  destinations: Destination[];
  onDestinationPress: (destination: Destination) => void;
  onCreatePress: () => void;
}

export function DestinationsScreen(props: DestinationsScreenProps) {
  return (
    <div className="DashboardScreen DestinationsScreen">
      <div className="DashboardScreen_Header">
        <Typography variant="h5">Destinos</Typography>
      </div>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Código</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.destinations.map((destination) => (
              <TableRow
                hover
                key={destination.id}
                onClick={() => props.onDestinationPress(destination)}
              >
                <TableCell>{destination.name}</TableCell>
                <TableCell>{destination.email}</TableCell>
                <TableCell>{destination.phone}</TableCell>
                <TableCell>{destination.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

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
