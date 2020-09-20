import React from "react";
import { Typography, Paper, Table, TableBody } from "@material-ui/core";
import { TableRow, TableCell, TextField, Button } from "@material-ui/core";
import { SettingsForm, formSchema, initialValues } from "./SettingsForm";
import { Map } from "../../components/Map";
import { PlacesSearchConnector } from "../../components/PlacesSearch";
import { Place } from "../../types";
import { Formik } from "formik";

export interface SettingsScreenProps {
  settings: SettingsForm;
  onSubmit: (values: SettingsForm) => void;
}

export function SettingsScreen(props: SettingsScreenProps) {
  const [focusedPlace, setFocusedPlace] = React.useState<Place>();

  function handleMapDblClick(lat: number, lng: number, setFieldValue: any) {
    setFieldValue("latitude", lat);
    setFieldValue("longitude", lng);
  }

  function handleSearchPlaceHover(place: Place) {
    setFocusedPlace(place);
  }

  function handleSearchPlaceClick(place: Place, setFieldValue: any) {
    setFocusedPlace(undefined);
    setFieldValue("latitude", place.latitude);
    setFieldValue("longitude", place.longitude);
  }

  function handleSubmit(values: SettingsForm) {
    props.onSubmit(values);
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues, ...props.settings }}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="DashboardScreen SettingsScreen">
            <div className="DashboardScreen_Header">
              <Typography variant="h5">Configuración</Typography>
            </div>
            <Paper>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TextField
                        name="name"
                        label="Nombre"
                        value={values.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="avgLoadTime"
                        label="Tiempo Carga"
                        type="number"
                        value={values.avgLoadTime}
                        onChange={handleChange}
                        error={!!errors.avgLoadTime}
                        helperText={errors.avgLoadTime}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Latitud"
                        name="latitude"
                        value={values.latitude}
                        onChange={handleChange}
                        error={!!errors.latitude}
                        helperText={errors.latitude}
                        placeholder="Seleccione un lugar en el mapa"
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Longitud"
                        name="longitude"
                        value={values.longitude}
                        onChange={handleChange}
                        error={!!errors.longitude}
                        helperText={errors.longitude}
                        placeholder="Seleccione un lugar en el mapa"
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <Button type="submit" variant="contained" color="primary">
                        Guardar
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="DestinationScreen_Map">
                <Map
                  companyPlace={{
                    latitude: values.latitude,
                    longitude: values.longitude
                  }}
                  focusedPlace={focusedPlace}
                  onDblClick={(lat, lng) =>
                    handleMapDblClick(lat, lng, setFieldValue)
                  }
                />
                <PlacesSearchConnector
                  onHover={handleSearchPlaceHover}
                  onClick={place =>
                    handleSearchPlaceClick(place, setFieldValue)
                  }
                />
              </div>
            </Paper>
          </div>
        </form>
      )}
    </Formik>
  );
}
