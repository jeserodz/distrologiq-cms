import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { DestinationScreen } from './DestinationScreen';
import { DestinationForm } from './DestinationScreen.form';
import { useQuery, useMutation } from 'react-query';
import { Toaster } from '../../utils/toaster';
import {
  DestinationsApi,
  CreateDestinationDTO,
  UpdateDestinationDTO,
} from 'distrologiq-sdk';
import { config } from '../../utils/config';
import { AuthContext } from '../../contexts/AuthContext';

export function DestinationScreenConnector() {
  const { id } = useParams();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const destinationsApi = new DestinationsApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  const { data: destination, isLoading } = useQuery('fetchDestination', () =>
    destinationsApi.destinationsControllerShow(id)
  );

  const [createDestination] = useMutation((data: CreateDestinationDTO) =>
    destinationsApi.destinationsControllerCreate(data)
  );

  const [updateDestination] = useMutation((data: UpdateDestinationDTO) =>
    destinationsApi.destinationsControllerUpdate(data, id)
  );

  async function handleCreate(values: DestinationForm) {
    const destination = await createDestination(values);
    Toaster.show('success', 'Destino creado.');
    history.replace(`/dashboard/destinations/${destination.id}`);
  }

  async function handleUpdate(data: UpdateDestinationDTO) {
    if (!id) return;
    const destination = await updateDestination(data);
    Toaster.show('success', 'Destino actualizado.');
    history.replace(`/dashboard/destinations/${destination.id}`);
  }

  return isLoading ? null : (
    <DestinationScreen
      destination={destination}
      onSubmit={(data) =>
        id
          ? handleUpdate(data as UpdateDestinationDTO)
          : handleCreate(data as CreateDestinationDTO)
      }
    />
  );
}
