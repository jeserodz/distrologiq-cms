import React from "react";
import { useHistory, useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Toaster } from "../../utils/toaster";
import { RouteStop } from "../../graphql";
import { Route } from "../../graphql";
import { RouteScreen } from "./RouteScreen";
import { RouteForm } from "./RouteScreen.form";
import { GET_DATA, GetData } from "./RouteScreen.graphql";
import { CALCULATE_ROUTE, CalculateRouteData } from "./RouteScreen.graphql";
import { CREATE_ROUTE } from "./RouteScreen.graphql";
import { UPDATE_ROUTE } from "./RouteScreen.graphql";

export function RouteScreenConnector() {
  const history = useHistory();
  const { id } = useParams();
  const { data } = useQuery<GetData>(GET_DATA, { variables: { id } });
  const [calculateRoute] = useMutation<CalculateRouteData>(CALCULATE_ROUTE);
  const [createRoute] = useMutation(CREATE_ROUTE);
  const [updateRoute] = useMutation(UPDATE_ROUTE);

  async function handleCalculate(routeStops: RouteStop[]) {
    const { data } = await calculateRoute({ variables: { routeStops } });
    return data;
  }

  async function handleUpdate(values: Route | RouteForm) {
    const { data } = await updateRoute({ variables: values });
    Toaster.show("success", "Ruta actualizada.");
    history.replace(`/dashboard/routes/${data.updateRoute.id}`);
  }

  async function handleCreate(values: Route | RouteForm) {
    const { data } = await createRoute({ variables: values });
    Toaster.show("success", "Ruta creada.");
    history.replace(`/dashboard/routes/${data.createRoute.id}`);
  }

  return data ? (
    <RouteScreen
      route={data.route}
      destinations={data.destinations}
      drivers={data.users}
      settings={data.settings}
      calculateFn={handleCalculate}
      onSave={id ? handleUpdate : handleCreate}
    />
  ) : null;
}
