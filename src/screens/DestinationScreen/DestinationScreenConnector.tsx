import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { DestinationScreen } from "./DestinationScreen";
import { DestinationForm } from "./DestinationScreen.form";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  GetDestinationData,
  GetDestinationVars,
  GET_DESTINATION,
  CreateDestinationData,
  CreateDestinationVars,
  CREATE_DESTINATION,
  UpdateDestinationData,
  UpdateDestinationVars,
  UPDATE_DESTINATION
} from "./DestinationScreen.graphql";
import { Toaster } from "../../utils/toaster";

export function DestinationScreenConnector() {
  const { id } = useParams();
  const history = useHistory();

  const [getDestination, { data, loading }] = useLazyQuery<GetDestinationData, GetDestinationVars>(
    GET_DESTINATION
  );

  const [createDestination, { data: createData }] = useMutation<
    CreateDestinationData,
    CreateDestinationVars
  >(CREATE_DESTINATION);

  const [updateDestination, {}] = useMutation<UpdateDestinationData, UpdateDestinationVars>(
    UPDATE_DESTINATION
  );

  React.useEffect(() => {
    if (id) getDestination({ variables: { id } });
  }, [id]);

  async function handleCreate(values: DestinationForm) {
    const { data } = await createDestination({ variables: values });
    Toaster.show("success", "Destino creado.");
    if (data) history.replace(`/dashboard/destinations/${data.createDestination.id}`);
  }

  async function handleUpdate(values: DestinationForm) {
    if (!id) return;
    const { data } = await updateDestination({ variables: { id, ...values } });
    Toaster.show("success", "Destino actualizado.");
    if (data) history.replace(`/dashboard/destinations/${data.updateDestination.id}`);
  }

  return loading ? null : (
    <DestinationScreen
      destination={data ? data.destination : null}
      onSubmit={id ? handleUpdate : handleCreate}
    />
  );
}
