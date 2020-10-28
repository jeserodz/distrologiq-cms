import React from 'react';
import {
  Typography,
  Paper,
  Table,
  TableRow,
  Button,
  Box,
  Grid,
} from '@material-ui/core';
import { TableCell, TableBody, TextField } from '@material-ui/core';
import { Formik, useFormik } from 'formik';
import { Map } from '../../components/Map';
import { PlacesSearchConnector } from '../../components/PlacesSearch';
import { Place } from '../../types';
import { Destination, CreateDestinationDTO } from '../../api';
import { formSchema, initialValues } from './DestinationScreen.form';
import './DestinationScreen.css';

export interface DestinationScreenProps {
  destination: Destination | undefined;
  onSubmit: (values: CreateDestinationDTO) => void;
}

export function DestinationScreen(props: DestinationScreenProps) {
  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: props.destination || initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const [focusedPlace, setFocusedPlace] = React.useState<Place | null>(null);

  function handleSearchPlaceHover(place: Place) {
    setFocusedPlace(place);
  }

  function handleSearchPlaceClick(place: Place, setFieldValue: any) {
    setFocusedPlace(null);
    formik.setFieldValue('latitude', place.latitude);
    formik.setFieldValue('longitude', place.longitude);
  }

  function handleMapDblClick(lat: number, lng: number, setFieldValue: any) {
    formik.setFieldValue('latitude', lat);
    formik.setFieldValue('longitude', lng);
  }

  function handleSubmit(values: CreateDestinationDTO) {
    console.log(values);
    props.onSubmit(values);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="DashboardScreen DestinationScreen">
        <div className="DashboardScreen_Header">
          <Typography variant="h5">Destino</Typography>
        </div>
        <Box maxWidth={1600}>
          <Paper>
            <Box margin={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6">Información General</Typography>
                  <Typography variant="subtitle1">
                    Introduzca los detalles del destino.
                  </Typography>
                  <Typography variant="subtitle2">
                    Esto puede representar a un cliente de la empresa, o
                    cualquier entidad que será usada como parada en las rutas.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    name="name"
                    label="Nombre"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={!!formik.errors.name}
                    helperText={formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={!!formik.errors.email}
                    helperText={formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    label="Teléfono"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={!!formik.errors.phone}
                    helperText={formik.errors.phone}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    label="Código"
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    error={!!formik.errors.code}
                    helperText={formik.errors.code}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    multiline
                    variant="outlined"
                    label="Referencias"
                    name="references"
                    value={formik.values.references}
                    onChange={formik.handleChange}
                    error={!!formik.errors.references}
                    helperText={formik.errors.references}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
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
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
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
                </Grid>

                <Grid item xs={12} md={6}>
                  <Button type="submit" variant="contained" color="primary">
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <div className="DestinationScreen_Map">
              <Map
                place={{
                  latitude: formik.values.latitude,
                  longitude: formik.values.longitude,
                }}
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
          </Paper>
        </Box>
      </div>
    </form>
  );
}
