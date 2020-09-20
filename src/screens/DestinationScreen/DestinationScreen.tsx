import React from 'react';
import { Typography, Paper, Table, TableRow, Button } from '@material-ui/core';
import { TableCell, TableBody, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import { Map } from '../../components/Map';
import { PlacesSearchConnector } from '../../components/PlacesSearch';
import { Place } from '../../types';
import { Destination } from '../../api';
import {
  DestinationForm,
  formSchema,
  initialValues,
} from './DestinationScreen.form';
import './DestinationScreen.css';

export interface DestinationScreenProps {
  destination: Destination | undefined;
  onSubmit: (values: DestinationForm) => void;
}

export function DestinationScreen(props: DestinationScreenProps) {
  const [focusedPlace, setFocusedPlace] = React.useState<Place | null>(null);

  function handleSearchPlaceHover(place: Place) {
    setFocusedPlace(place);
  }

  function handleSearchPlaceClick(place: Place, setFieldValue: any) {
    setFocusedPlace(null);
    setFieldValue('latitude', place.latitude);
    setFieldValue('longitude', place.longitude);
  }

  function handleMapDblClick(lat: number, lng: number, setFieldValue: any) {
    setFieldValue('latitude', lat);
    setFieldValue('longitude', lng);
  }

  function handleSubmit(values: DestinationForm) {
    console.log(values);
    props.onSubmit(values);
  }

  return (
    <Formik
      validationSchema={formSchema}
      initialValues={props.destination || initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleSubmit, handleChange, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="DashboardScreen DestinationScreen">
            <div className="DashboardScreen_Header">
              <Typography variant="h5">Destino</Typography>
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
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Teléfono"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Código"
                        name="code"
                        value={values.code}
                        onChange={handleChange}
                        error={!!errors.code}
                        helperText={errors.code}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
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
                      <TextField
                        label="Referencias"
                        name="references"
                        value={values.references}
                        onChange={handleChange}
                        error={!!errors.references}
                        helperText={errors.references}
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
                  place={{
                    latitude: values.latitude,
                    longitude: values.longitude,
                  }}
                  focusedPlace={focusedPlace}
                  onDblClick={(lat, lng) =>
                    handleMapDblClick(lat, lng, setFieldValue)
                  }
                />
                <PlacesSearchConnector
                  onHover={handleSearchPlaceHover}
                  onClick={(place) =>
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
