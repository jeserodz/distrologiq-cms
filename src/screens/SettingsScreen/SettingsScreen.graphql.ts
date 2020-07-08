import { gql } from "apollo-boost";
import { Settings, MutationSetSettingsArgs } from "../../graphql";

export const GET_SETTINGS = gql`
  query GetSettings {
    settings {
      name
      avgLoadTime
      destination {
        longitude
        latitude
      }
    }
  }
`;

export interface GetSettingsData {
  settings: Settings;
}

export const SET_SETTINGS = gql`
  mutation SetSettings(
    $name: String!
    $avgLoadTime: Float!
    $longitude: Float!
    $latitude: Float!
  ) {
    setSettings(
      name: $name
      avgLoadTime: $avgLoadTime
      longitude: $longitude
      latitude: $latitude
    ) {
      name
      avgLoadTime
      destination {
        longitude
        latitude
      }
    }
  }
`;

export interface SetSettingsVars extends MutationSetSettingsArgs {}
