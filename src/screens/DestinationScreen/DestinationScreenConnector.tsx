import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { DestinationScreen } from './DestinationScreen';
import { DestinationForm } from './DestinationScreen.form';
import { useQuery, useMutation } from 'react-query';
import { Toaster } from '../../utils/toaster';
import { Context } from '../../Context';
import {
  DestinationsApi,
  CreateDestinationDTO,
  UpdateDestinationDTO,
} from '../../api';

export function DestinationScreenConnector() {
  const { id } = useParams();
  const history = useHistory();
  const context = useContext(Context);

  const destinationsApi = new DestinationsApi(context.getApiConfig());

  const getDestinationResponse = useQuery('getDestination', () =>
    destinationsApi.getDestination(id)
  );

  const [createDestination] = useMutation((data: CreateDestinationDTO) =>
    destinationsApi.createDestination(data)
  );

  const [updateDestination] = useMutation((data: UpdateDestinationDTO) =>
    destinationsApi.updateDestination(id, data)
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

  return getDestinationResponse.isLoading ? null : (
    <DestinationScreen
      destination={getDestinationResponse.data}
      onSubmit={(data) =>
        id
          ? handleUpdate(data as UpdateDestinationDTO)
          : handleCreate(data as CreateDestinationDTO)
      }
    />
  );
}
