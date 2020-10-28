import React, { useContext } from 'react';
import { RouteComponentProps, useNavigate, useParams } from '@reach/router';
import { useQuery, useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { Toaster } from '../../utils/toaster';
import { RouteScreen } from './RouteScreen';
import { Context } from '../../Context';
import {
  CalculateRouteDTO,
  CreateRouteDTO,
  UpdateRouteDTO,
  RouteStop,
  Route,
  Destination,
  User,
  Settings,
  CalculateRouteResponse,
} from '../../api';

export function RouteScreenConnector(props: RouteComponentProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(Context);
  const api = context.getApi();

  const getRoute = useQuery(
    ['getRoute', id],
    async (key, id) => {
      const response = await api.get(`/routes/${id}`);
      return response.data as Route;
    },
    {
      enabled: id !== 'new',
      onError: (error: AxiosError) => {
        Toaster.show('error', error.response?.data.message || error.message);
      },
    }
  );

  const getDestinations = useQuery(
    'getDestinations',
    async () => {
      const response = await api.get('/destinations');
      return response.data as Destination[];
    },
    {
      onError: (error: AxiosError) => {
        Toaster.show('error', error.response?.data.message || error.message);
      },
    }
  );

  const getDrivers = useQuery(
    'getDrivers',
    async () => {
      const response = await api.get('/users');
      return response.data as User[];
    },
    {
      onError: (error: AxiosError) => {
        Toaster.show('error', error.response?.data.message || error.message);
      },
    }
  );

  const getSettings = useQuery(
    'getSettings',
    async () => {
      const response = await api.get('/settings');
      return response.data as Settings;
    },
    {
      onError: (error: AxiosError) => {
        Toaster.show('error', error.response?.data.message || error.message);
      },
    }
  );

  const [calculateRoute] = useMutation(
    async (data: CalculateRouteDTO) => {
      const response = await api.post('/maps/calculateRoute', data);
      return response.data as CalculateRouteResponse;
    },
    {
      onSuccess: () => {
        Toaster.show('success', 'Ruta optimizada');
      },
      onError: (error: AxiosError) => {
        Toaster.show('error', error.response?.data.message || error.message);
      },
    }
  );

  const [createRoute] = useMutation(
    async (data: CreateRouteDTO) => {
      const response = await api.post('/routes', data);
      return response.data as Route;
    },
    {
      onError: (error: AxiosError) => {
        Toaster.show('error', error.response?.data.message || error.message);
      },
    }
  );

  const [updateRoute] = useMutation(
    async (data: UpdateRouteDTO) => {
      const response = await api.patch(`/routes/${id}`, data);
      return response.data as Route;
    },
    {
      onError: (error: AxiosError) => {
        Toaster.show('error', error.response?.data.message || error.message);
      },
    }
  );

  const [deleteRoute] = useMutation(
    async () => {
      await api.delete(`/routes/${id}`);
    },
    {
      onError: (error: AxiosError) => {
        Toaster.show('error', error.response?.data.message || error.message);
      },
      onSuccess: () => {
        Toaster.show('success', 'Ruta eliminada.');
        navigate(`/dashboard/routes`, { replace: true });
      },
    }
  );

  async function handleCalculate(data: CalculateRouteDTO) {
    const result = await calculateRoute(data);
    return result;
  }

  async function handleUpdate(data: UpdateRouteDTO) {
    const route = await updateRoute(data);
    Toaster.show('success', 'Ruta actualizada.');
    navigate(`/dashboard/routes/${route.id}`, { replace: true });
  }

  async function handleCreate(data: CreateRouteDTO) {
    const route = await createRoute(data);
    Toaster.show('success', 'Ruta creada.');
    navigate(`/dashboard/routes/${route.id}`, { replace: true });
  }

  return (id === 'new' || getRoute.data) &&
    getDestinations.data &&
    getDrivers.data &&
    getSettings.data ? (
    <RouteScreen
      route={getRoute.data}
      destinations={getDestinations.data}
      drivers={getDrivers.data}
      settings={getSettings.data}
      calculateFn={handleCalculate}
      onSave={(values) =>
        id === 'new'
          ? handleCreate(values as CreateRouteDTO)
          : handleUpdate(values as UpdateRouteDTO)
      }
      onDelete={deleteRoute}
    />
  ) : null;
}
