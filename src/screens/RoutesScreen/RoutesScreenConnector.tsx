import React, { useContext } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { useQuery } from 'react-query';
import { Toaster } from '../../utils/toaster';
import { RoutesScreen } from './RoutesScreen';
import { Route } from '../../api';
import { Context } from '../../Context';
import { AxiosError } from 'axios';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';

export function RoutesScreenConnector(props: RouteComponentProps) {
  const navigate = useNavigate();
  const context = useContext(Context);
  const api = context.getApi();

  const getRoutes = useQuery(
    ['getRoutes'],
    async () => {
      const response = await api.get('/routes');
      return response.data as Route[];
    },
    {
      onError: (error: AxiosError) => {
        Toaster.show(`error`, error.response?.data.message || error.message);
      },
    }
  );

  function handleRoutePress(route: Route) {
    navigate(`/dashboard/routes/${route.id}`);
  }

  function handleCreatePress() {
    navigate('/dashboard/routes/new');
  }

  return getRoutes.data ? (
    <RoutesScreen
      routes={getRoutes.data}
      onRoutePress={handleRoutePress}
      onCreatePress={handleCreatePress}
    />
  ) : (
    <LoadingOverlay />
  );
}
