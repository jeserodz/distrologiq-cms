import React, { useContext } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { DestinationsScreen } from './DestinationsScreen';
import { useQuery } from 'react-query';
import { Context } from '../../Context';
import { DestinationsApi, Destination } from '../../api';

export function DestinationsScreenConnector(props: RouteComponentProps) {
  const navigate = useNavigate();
  const context = useContext(Context);

  const destinationsApi = new DestinationsApi(context.getApiConfig());

  const fetchDestinationsResponse = useQuery('fetchDestinations', () =>
    destinationsApi.getDestinations()
  );

  function handleDestinationPress(destination: Destination) {
    navigate(`./destinations/${destination.id}`);
  }

  function handleCreatePress() {
    navigate(`./destinations/new`);
  }

  return fetchDestinationsResponse.data ? (
    <DestinationsScreen
      destinations={fetchDestinationsResponse.data}
      onDestinationPress={handleDestinationPress}
      onCreatePress={handleCreatePress}
    />
  ) : null;
}
