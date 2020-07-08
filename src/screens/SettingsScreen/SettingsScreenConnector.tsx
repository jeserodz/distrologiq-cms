import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { SettingsScreen } from "./SettingsScreen";
import { SettingsForm } from "./SettingsForm";
import { Toaster } from "../../utils/toaster";
import {
  GET_SETTINGS,
  GetSettingsData,
  SET_SETTINGS,
  SetSettingsVars
} from "./SettingsScreen.graphql";

export function SettingsScreenConnector() {
  const { data, refetch } = useQuery<GetSettingsData>(GET_SETTINGS);
  const [setSettings] = useMutation<GetSettingsData, SetSettingsVars>(SET_SETTINGS, {
    onCompleted: () => {
      Toaster.show("success", "Cambios guardados.");
      refetch();
    }
  });

  function handleSubmit(data: SettingsForm) {
    setSettings({ variables: data });
  }

  return data ? (
    <SettingsScreen
      settings={{
        name: data.settings.name,
        avgLoadTime: data.settings.avgLoadTime,
        latitude: data.settings.destination.latitude,
        longitude: data.settings.destination.longitude
      }}
      onSubmit={handleSubmit}
    />
  ) : null;
}
