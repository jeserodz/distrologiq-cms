import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { DestinationsScreen } from './DestinationsScreen';
import { useQuery } from 'react-query';
import { Context } from '../../Context';
import { DestinationsApi, Destination } from '../../api';

export function DestinationsScreenConnector() {
  const history = useHistory();
  const location = useLocation();
  const context = useContext(Context);

  const destinationsApi = new DestinationsApi(context.getApiConfig());

  const fetchDestinationsResponse = useQuery('fetchDestinations', () =>
    destinationsApi.getDestinations()
  );

  function handleDestinationPress(destination: Destination) {
    history.push(`${location.pathname}/${destination.id}`);
  }

  function handleCreatePress() {
    history.push(`${location.pathname}/new`);
  }

  return fetchDestinationsResponse.data ? (
    <DestinationsScreen
      destinations={fetchDestinationsResponse.data}
      onDestinationPress={handleDestinationPress}
      onCreatePress={handleCreatePress}
    />
  ) : null;
}
