import React, { useContext } from 'react';
import { SettingsScreen } from './SettingsScreen';
import { SettingsForm } from './SettingsForm';
import { Toaster } from '../../utils/toaster';
import { useQuery, useMutation } from 'react-query';
import { SettingsApi, SetSettingsDTO } from 'distrologiq-sdk';
import { config } from '../../utils/config';
import { AuthContext } from '../../contexts/AuthContext';

export function SettingsScreenConnector() {
  const auth = useContext(AuthContext);

  const settingsApi = new SettingsApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  const { data, refetch } = useQuery('fetchSettings', () =>
    settingsApi.settingsControllerIndex()
  );

  const [setSettings] = useMutation(
    (data: SetSettingsDTO) => settingsApi.settingsControllerSetSettings(data),
    {
      onSuccess: () => {
        Toaster.show('success', 'Cambios guardados.');
        refetch();
      },
    }
  );

  function handleSubmit(data: SettingsForm) {
    setSettings(data);
  }

  return data ? (
    <SettingsScreen
      settings={{
        name: data.name,
        avgLoadTime: data.avgLoadTime,
        latitude: data.destination.latitude,
        longitude: data.destination.longitude,
      }}
      onSubmit={handleSubmit}
    />
  ) : null;
}
