import React, { useContext } from 'react';
import { RouteComponentProps, useParams, useNavigate } from '@reach/router';
import { DestinationScreen } from './DestinationScreen';
import { useQuery, useMutation } from 'react-query';
import { Toaster } from '../../utils/toaster';
import { Context } from '../../Context';
import {
  CreateDestinationDTO,
  UpdateDestinationDTO,
  Destination,
} from '../../api';
import { AxiosError } from 'axios';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';

export function DestinationScreenConnector(props: RouteComponentProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(Context);
  const api = context.getApi();

  const getDestination = useQuery(
    ['getDestination', id],
    async () => {
      const response = await api.get(`/destinations/${id}`);
      return response.data as Destination;
    },
    {
      enabled: id !== 'new',
      onError: (error: AxiosError) => {
        Toaster.show('error', error.response?.data.message || error.message);
      },
    }
  );

  const [createDestination] = useMutation(
    async (data: CreateDestinationDTO) => {
      const response = await api.post('/destinations', data);
      return response.data as Destination;
    },
    {
      onSuccess: (destination) => {
        Toaster.show('success', 'Destino creado');
        navigate(`/dashboard/destinations/${destination.id}`, {
          replace: true,
        });
      },
      onError: (error: AxiosError) => {
        Toaster.show('error', error.response?.data.message || error.message);
      },
    }
  );

  const [updateDestination] = useMutation(
    async (data: UpdateDestinationDTO) => {
      const response = await api.patch(`/destinations/${id}`, data);
      return response.data as Destination;
    },
    {
      onSuccess: () => {
        Toaster.show('success', 'Destino actualizado');
        getDestination.refetch();
      },
      onError: (error: AxiosError) => {
        Toaster.show('error', error.response?.data.message || error.message);
      },
    }
  );

  const [deleteDestination] = useMutation(
    async () => {
      await api.delete(`/destinations/${id}`);
    },
    {
      onSuccess: () => {
        Toaster.show('success', 'Destino eliminado');
        navigate('/dashboard/destinations');
      },
      onError: (error: AxiosError) => {
        Toaster.show('error', error.response?.data.message || error.message);
      },
    }
  );

  return id === 'new' || getDestination.data ? (
    <DestinationScreen
      destination={getDestination.data}
      onDelete={() => deleteDestination()}
      onSubmit={(data) =>
        id === 'new'
          ? createDestination(data as CreateDestinationDTO)
          : updateDestination(data as UpdateDestinationDTO)
      }
    />
  ) : (
    <LoadingOverlay />
  );
}
