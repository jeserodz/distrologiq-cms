import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { DestinationsScreen } from './DestinationsScreen';
import { useQuery } from 'react-query';
import { Destination, DestinationsApi } from 'distrologiq-sdk';
import { AuthContext } from '../../contexts/AuthContext';
import { config } from '../../utils/config';

export function DestinationsScreenConnector() {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);

  const destinationsApi = new DestinationsApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  const { data: destinations } = useQuery('fetchDestinations', () =>
    destinationsApi.destinationsControllerIndex()
  );

  function handleDestinationPress(destination: Destination) {
    history.push(`${location.pathname}/${destination.id}`);
  }

  function handleCreatePress() {
    history.push(`${location.pathname}/new`);
  }

  return destinations ? (
    <DestinationsScreen
      destinations={destinations}
      onDestinationPress={handleDestinationPress}
      onCreatePress={handleCreatePress}
    />
  ) : null;
}
