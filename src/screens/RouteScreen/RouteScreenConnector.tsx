import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import { Toaster } from '../../utils/toaster';
import { RouteScreen } from './RouteScreen';
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
} from '../../api';
import { Context } from '../../Context';

export function RouteScreenConnector() {
  const history = useHistory();
  const context = useContext(Context);
  const { id } = useParams();
  const routesApi = new RoutesApi(context.getApiConfig());
  const destinationsApi = new DestinationsApi(context.getApiConfig());
  const usersApi = new UsersApi(context.getApiConfig());
  const mapsApi = new MapsApi(context.getApiConfig());
  const settingsApi = new SettingsApi(context.getApiConfig());

  const getRouteResponse = useQuery(['getRoute', id], (key, id) =>
    routesApi.getRoute(id)
  );

  const getDestinationsResponse = useQuery('getDestinations', () =>
    destinationsApi.getDestinations()
  );

  const getDriversResponse = useQuery('getDrivers', () => usersApi.getUsers());

  const getSettingsResponse = useQuery('getSettings', () =>
    settingsApi.getSettings()
  );

  const [calculateRoute] = useMutation((data: CalculateRouteDTO) =>
    mapsApi.calculateRoute(data)
  );
  const [createRoute] = useMutation((data: CreateRouteDTO) =>
    routesApi.createRoute(data)
  );
  const [updateRoute] = useMutation((data: UpdateRouteDTO) =>
    routesApi.updateRoute(id, data)
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

  return getRouteResponse.data &&
    getDestinationsResponse.data &&
    getDriversResponse.data &&
    getSettingsResponse.data ? (
    <RouteScreen
      route={getRouteResponse.data}
      destinations={getDestinationsResponse.data}
      drivers={getDriversResponse.data}
      settings={getSettingsResponse.data}
      calculateFn={handleCalculate}
      onSave={(values) =>
        id
          ? handleUpdate(values as UpdateRouteDTO)
          : handleCreate(values as CreateRouteDTO)
      }
    />
  ) : null;
}
