import React, { useContext } from "react";
import { useQuery, useMutation } from "react-query";
import { Toaster } from "../../utils/toaster";
import { SettingsScreen } from "./SettingsScreen";
import { SettingsForm } from "./SettingsForm";
import { SettingsApi, SetSettingsDTO } from "../../api";
import { Context } from "../../Context";

export function SettingsScreenConnector() {
  const context = useContext(Context);
  const settingsApi = new SettingsApi(context.getApiConfig());

  const getSettingsResponse = useQuery(["getSettings"], (key) =>
    settingsApi.getSettings()
  );

  const [setSettings] = useMutation(
    (data: SetSettingsDTO) => settingsApi.updateSettings(data),
    {
      onSuccess: () => {
        Toaster.show("success", "Cambios guardados.");
        getSettingsResponse.refetch();
      },
    }
  );

  function handleSubmit(data: SettingsForm) {
    setSettings(data);
  }

  return getSettingsResponse.data ? (
    <SettingsScreen
      settings={{
        name: getSettingsResponse.data.name,
        avgLoadTime: getSettingsResponse.data.avgLoadTime,
        latitude: getSettingsResponse.data.destination.latitude,
        longitude: getSettingsResponse.data.destination.longitude,
      }}
      onSubmit={handleSubmit}
    />
  ) : null;
}
