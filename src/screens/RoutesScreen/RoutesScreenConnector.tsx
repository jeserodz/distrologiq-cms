import React from "react";
import { useHistory } from "react-router";
import { RoutesScreen } from "./RoutesScreen";
import { Route } from "../../graphql";
import { useQuery } from "@apollo/react-hooks";
import { GET_ROUTES, GetRoutesData } from "./RoutesScreen.graphql";

export function RoutesScreenConnector() {
  const history = useHistory();
  const { data } = useQuery<GetRoutesData>(GET_ROUTES);

  function handleRoutePress(route: Route) {
    history.push(`/dashboard/routes/${route.id}`);
  }

  function handleCreatePress() {
    history.push("/dashboard/routes/new");
  }

  return data ? (
    <RoutesScreen
      routes={data.routes || []}
      onRoutePress={handleRoutePress}
      onCreatePress={handleCreatePress}
    />
  ) : null;
}
