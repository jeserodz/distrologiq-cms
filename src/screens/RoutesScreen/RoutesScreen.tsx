import React from 'react';
import { Paper, Table, TableHead, Typography, Fab } from '@material-ui/core';
import { TableRow, TableCell, TableBody } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Route } from 'distrologiq-sdk';
import {
  displayDistance,
  displayDuration,
  displayRoutePerformance,
} from '../../utils/display-helpers';

export interface RoutesScreenProps {
  routes: Route[];
  onRoutePress: (route: Route) => void;
  onCreatePress: () => void;
}

export function RoutesScreen(props: RoutesScreenProps) {
  return (
    <div className="DashboardScreen DestinationsScreen">
      <div className="DashboardScreen_Header">
        <Typography variant="h5">Rutas</Typography>
      </div>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Paradas</TableCell>
              <TableCell>Distancia</TableCell>
              <TableCell>Iniciada</TableCell>
              <TableCell>Completada</TableCell>
              <TableCell>Transportista</TableCell>
              <TableCell>Duración Planificada</TableCell>
              <TableCell>Duración Real</TableCell>
              <TableCell>Efectividad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.routes.map((route) => (
              <TableRow
                hover
                key={route.id}
                onClick={() => props.onRoutePress(route)}
              >
                <TableCell>{route.name}</TableCell>
                <TableCell>{route.stops.length}</TableCell>
                <TableCell>{displayDistance(route.distance)}</TableCell>
                <TableCell>{route.started ? 'Si' : 'No'}</TableCell>
                <TableCell>{route.completed ? 'Si' : 'No'}</TableCell>
                <TableCell>
                  {route.driver ? route.driver.displayName : 'Sin Asignar'}
                </TableCell>
                <TableCell>{displayDuration(route.duration)}</TableCell>
                <TableCell>
                  {displayDuration(route.completedDuration)}
                </TableCell>
                <TableCell>
                  {displayRoutePerformance(
                    route.duration,
                    route.completedDuration
                  )}
                </TableCell>
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
