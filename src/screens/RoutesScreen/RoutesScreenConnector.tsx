import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { RoutesScreen } from './RoutesScreen';
import { useQuery } from 'react-query';
import { AuthContext } from '../../contexts/AuthContext';
import { RoutesApi, Route } from 'distrologiq-sdk';
import { config } from '../../utils/config';

export function RoutesScreenConnector() {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const routesApi = new RoutesApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  const { data } = useQuery('fetchRoutes', () =>
    routesApi.routesControllerIndex()
  );

  function handleRoutePress(route: Route) {
    history.push(`/dashboard/routes/${route.id}`);
  }

  function handleCreatePress() {
    history.push('/dashboard/routes/new');
  }

  return data ? (
    <RoutesScreen
      routes={data || []}
      onRoutePress={handleRoutePress}
      onCreatePress={handleCreatePress}
    />
  ) : null;
}
