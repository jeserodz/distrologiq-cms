import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import { Toaster } from '../../utils/toaster';
import { RouteScreen } from './RouteScreen';
import { RouteForm } from './RouteScreen.form';
import { config } from '../../utils/config';
import { AuthContext } from '../../contexts/AuthContext';
import {
  RoutesApi,
  MapsApi,
  CalculateRouteDTO,
  CreateRouteDTO,
  UpdateRouteDTO,
  RouteStop,
  DestinationsApi,
  UsersApi,
  SettingsApi,
} from 'distrologiq-sdk';

export function RouteScreenConnector() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { id } = useParams();

  const routesApi = new RoutesApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  const destinationsApi = new DestinationsApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  const usersApi = new UsersApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  const mapsApi = new MapsApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  const settingsApi = new SettingsApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  const { data: route } = useQuery(['fetchRoute', id], (key, id) =>
    routesApi.routesControllerShow(id)
  );

  const { data: destinations } = useQuery('fetchDestinations', () =>
    destinationsApi.destinationsControllerIndex()
  );

  const { data: users } = useQuery('fetchDrivers', () =>
    usersApi.usersControllerIndex()
  );

  const { data: settings } = useQuery('fetchSettings', () =>
    settingsApi.settingsControllerIndex()
  );

  const [calculateRoute] = useMutation((data: CalculateRouteDTO) =>
    mapsApi.mapsControllerCalculateRoute(data)
  );
  const [createRoute] = useMutation((data: CreateRouteDTO) =>
    routesApi.create(data)
  );
  const [updateRoute] = useMutation((data: UpdateRouteDTO) =>
    routesApi.routesControllerUpdate(data, id)
  );

  async function handleCalculate(routeStops: RouteStop[]) {
    const data = await calculateRoute({ routeStops });
    return data;
  }

  async function handleUpdate(data: UpdateRouteDTO) {
    const route = await updateRoute(data);
    Toaster.show('success', 'Ruta actualizada.');
    history.replace(`/dashboard/routes/${route.id}`);
  }

  async function handleCreate(data: CreateRouteDTO) {
    const route = await createRoute(data);
    Toaster.show('success', 'Ruta creada.');
    history.replace(`/dashboard/routes/${route.id}`);
  }

  return route && destinations && users && settings ? (
    <RouteScreen
      route={route}
      destinations={destinations}
      drivers={users}
      settings={settings}
      calculateFn={handleCalculate}
      onSave={(values) =>
        id
          ? handleUpdate(values as UpdateRouteDTO)
          : handleCreate(values as CreateRouteDTO)
      }
    />
  ) : null;
}
