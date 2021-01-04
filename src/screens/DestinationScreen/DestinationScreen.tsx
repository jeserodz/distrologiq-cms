import React, { useState, useEffect } from "react";
import * as Mui from "@material-ui/core";
import * as MuiIcons from "@material-ui/icons";
import { useFormik } from "formik";
import { Map } from "../../components/Map";
import { PlacesSearchConnector } from "../../components/PlacesSearch";
import { Place } from "../../types";
import { Destination, CreateDestinationDTO } from "../../api";
import { formSchema, initialValues } from "./DestinationScreen.form";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import "./DestinationScreen.css";

export interface DestinationScreenProps {
  destination: Destination | undefined;
  onSubmit: (values: CreateDestinationDTO) => void;
  onDelete: () => any;
}

export function DestinationScreen(props: DestinationScreenProps) {
  const [focusedPlace, setFocusedPlace] = useState<Place | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [displayAllData, setDisplayAllData] = useState(
    window.innerWidth <= 600 === false
  );

  // Hides table columns when screen resizes
  useEffect(() => {
    function resizeHandler() {
      setDisplayAllData(window.innerWidth <= 600 === false);
    }

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: props.destination || initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  function handleSearchPlaceHover(place: Place) {
    setFocusedPlace(place);
  }

  function handleSearchPlaceClick(place: Place, setFieldValue: any) {
    setFocusedPlace(null);
    formik.setFieldValue("latitude", place.latitude);
    formik.setFieldValue("longitude", place.longitude);
  }

  function handleMapDblClick(lat: number, lng: number, setFieldValue: any) {
    formik.setFieldValue("latitude", lat);
    formik.setFieldValue("longitude", lng);
  }

  function handleSubmit(values: CreateDestinationDTO) {
    console.log(values);
    props.onSubmit(values);
  }

  function handleDelete() {
    props.onDelete();
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="DashboardScreen DestinationScreen">
        <div className="DashboardScreen_Header">
          <Mui.Typography variant="h5">Destino</Mui.Typography>
        </div>
        <Mui.Box maxWidth={1600}>
          <Mui.Paper>
            <Mui.Box margin={3}>
              <Mui.Grid container spacing={3}>
                <Mui.Grid item xs={12}>
                  <Mui.Typography variant="h6">
                    Información General
                  </Mui.Typography>
                  <Mui.Typography variant="subtitle1">
                    Introduzca los detalles del destino.
                  </Mui.Typography>
                  <Mui.Typography variant="subtitle2">
                    Esto puede representar a un cliente de la empresa, o
                    cualquier entidad que será usada como parada en las rutas.
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item xs={12} md={6}>
                  <Mui.TextField
                    variant="outlined"
                    name="name"
                    label="Nombre"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={!!formik.errors.name}
                    helperText={formik.errors.name}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} md={6}>
                  <Mui.TextField
                    variant="outlined"
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={!!formik.errors.email}
                    helperText={formik.errors.email}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} md={6}>
                  <Mui.TextField
                    variant="outlined"
                    label="Teléfono"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={!!formik.errors.phone}
                    helperText={formik.errors.phone}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} md={6}>
                  <Mui.TextField
                    variant="outlined"
                    label="Código"
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    error={!!formik.errors.code}
                    helperText={formik.errors.code}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} md={6}>
                  <Mui.TextField
                    multiline
                    variant="outlined"
                    label="Referencias"
                    name="references"
                    value={formik.values.references}
                    onChange={formik.handleChange}
                    error={!!formik.errors.references}
                    helperText={formik.errors.references}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6} md={3}>
                  <Mui.TextField
                    variant="outlined"
                    label="Latitud"
                    name="latitude"
                    value={formik.values.latitude}
                    onChange={formik.handleChange}
                    error={!!formik.errors.latitude}
                    helperText={formik.errors.latitude}
                    placeholder="Seleccione un lugar en el mapa"
                    disabled
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6} md={3}>
                  <Mui.TextField
                    variant="outlined"
                    label="Longitud"
                    name="longitude"
                    value={formik.values.longitude}
                    onChange={formik.handleChange}
                    error={!!formik.errors.longitude}
                    helperText={formik.errors.longitude}
                    placeholder="Seleccione un lugar en el mapa"
                    disabled
                  />
                </Mui.Grid>

                <Mui.Grid item xs={12} md={6}>
                  <Mui.Box display="flex">
                    <Mui.Box>
                      <Mui.Button
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Guardar
                      </Mui.Button>
                    </Mui.Box>
                    {props.destination?.id && (
                      <Mui.Box ml={2}>
                        <Mui.Button
                          variant="outlined"
                          color="default"
                          startIcon={<MuiIcons.Delete color="error" />}
                          onClick={() => setDeleteDialogOpen(true)}
                        >
                          Eliminar Ruta
                        </Mui.Button>
                      </Mui.Box>
                    )}
                  </Mui.Box>
                </Mui.Grid>
              </Mui.Grid>
            </Mui.Box>
            {displayAllData && (
              <>
                <div className="DestinationScreen_Map">
                  <Map
                    place={formik.values}
                    focusedPlace={focusedPlace}
                    onDblClick={(lat, lng) =>
                      handleMapDblClick(lat, lng, formik.setFieldValue)
                    }
                  />
                  <PlacesSearchConnector
                    onHover={handleSearchPlaceHover}
                    onClick={(place) =>
                      handleSearchPlaceClick(place, formik.setFieldValue)
                    }
                  />
                </div>
              </>
            )}
          </Mui.Paper>
        </Mui.Box>
      </div>
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Eliminar Destino"
        body="¿Realmente desea eliminar este destino?"
        onCancel={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </form>
  );
}
