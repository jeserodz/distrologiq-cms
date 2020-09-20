import React, { useContext } from "react";
import { useHistory } from "react-router";
import { useQuery } from "react-query";
import { Toaster } from "../../utils/toaster";
import { RoutesScreen } from "./RoutesScreen";
import { RoutesApi, Route } from "../../api";
import { Context } from "../../Context";

export function RoutesScreenConnector() {
  const history = useHistory();
  const context = useContext(Context);
  const routesApi = new RoutesApi(context.getApiConfig());

  const getRoutesResponse = useQuery(["getRoutes"], (key) =>
    routesApi.getRoutes()
  );

  function handleRoutePress(route: Route) {
    history.push(`/dashboard/routes/${route.id}`);
  }

  function handleCreatePress() {
    history.push("/dashboard/routes/new");
  }

  if (getRoutesResponse.error) {
    Toaster.show(`error`, getRoutesResponse.error.message);
  }

  return getRoutesResponse.data ? (
    <RoutesScreen
      routes={getRoutesResponse.data}
      onRoutePress={handleRoutePress}
      onCreatePress={handleCreatePress}
    />
  ) : null;
}
