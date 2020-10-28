import React from 'react';
import {
  Paper,
  Table,
  TableHead,
  Typography,
  Fab,
  Box,
} from '@material-ui/core';
import { TableRow, TableCell, TableBody } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Destination } from '../../api';

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
      <Box maxWidth={1600}>
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
                  <TableCell>{destination.email || 'No Disponible'}</TableCell>
                  <TableCell>{destination.phone || 'No Disponible'}</TableCell>
                  <TableCell>{destination.code || 'No Disponible'}</TableCell>
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
