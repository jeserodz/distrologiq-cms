import React from "react";
import { useHistory, useLocation } from "react-router";
import { DestinationsScreen } from "./DestinationsScreen";
import { useQuery } from "@apollo/react-hooks";
import { Destination } from "../../graphql";
import { GET_DESTINATIONS, GetDestinationsData } from "./DestinationsScreen.graphql";

export function DestinationsScreenConnector() {
  const history = useHistory();
  const location = useLocation();
  const { data } = useQuery<GetDestinationsData>(GET_DESTINATIONS);

  function handleDestinationPress(destination: Destination) {
    history.push(`${location.pathname}/${destination.id}`);
  }

  function handleCreatePress() {
    history.push(`${location.pathname}/new`);
  }

  return data ? (
    <DestinationsScreen
      destinations={data.destinations}
      onDestinationPress={handleDestinationPress}
      onCreatePress={handleCreatePress}
    />
  ) : null;
}
