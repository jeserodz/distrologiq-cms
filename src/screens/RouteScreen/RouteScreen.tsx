import './RouteScreen.css';
import React, { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import {
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
  useTheme,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { useFormik } from 'formik';
import { FormikUtils } from '../../utils/formik';
import { displayDistance, displayDuration } from '../../utils/display-helpers';
import { RouteScreenForm, formSchema, initialValues } from './RouteScreen.form';
import { Map } from '../../components/Map';
import { RouteStopCard } from '../../components/RouteStopCard';
import {
  Destination,
  User,
  Route,
  RouteStop,
  CalculateRouteResponse,
  RouteGeometry,
  Settings,
  RouteStopTypeEnum,
  CreateRouteDTO,
  UpdateRouteDTO,
  CalculateRouteDTO,
} from '../../api';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';

export interface RouteScreenProps {
  route: Route | undefined;
  destinations: Destination[] | undefined;
  drivers: User[] | undefined;
  settings: Settings | undefined;
  onSave: (route: Partial<CreateRouteDTO | UpdateRouteDTO>) => void;
  onDelete: () => any;
  calculateFn: (
    data: CalculateRouteDTO
  ) => Promise<CalculateRouteResponse | undefined>;
}

export function RouteScreen(props: RouteScreenProps) {
  const [destinationsFilter, setDestinationsFilter] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const formik = useFormik<RouteScreenForm>({
    initialValues: props.route || initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => props.onSave(values),
    enableReinitialize: true,
    isInitialValid: false,
  });

  const formikUtils = new FormikUtils({ formik, validateAfterSubmit: true });

  function filterDestinations(destination: Destination) {
    const filterText = destinationsFilter.toLowerCase();
    return (
      destination.name.toLowerCase().includes(filterText) ||
      destination.code?.toLowerCase().includes(filterText)
    );
  }

  function clearCalculation() {
    formik.setFieldValue('distance', initialValues.distance);
    formik.setFieldValue('duration', initialValues.duration);
    formik.setFieldValue('durationWithLoadTime', initialValues.durationWithLoadTime); // prettier-ignore
    formik.setFieldValue('geometry', initialValues.geometry);
  }

  function clearEstimatedEndDate() {
    formik.setFieldValue('estimatedEndDate', null);
  }

  function initializeFinalStop() {
    if (formik.values.stops.length === 0 && props.settings) {
      const finalStop = {
        type: RouteStopTypeEnum.ARRIVAL,
        destination: props.settings.destination,
        started: null,
        completed: null,
      };
      formik.setFieldValue('stops', [finalStop]);
    }
  }

  function handleDestinationsChange(
    destination: Destination,
    selected: boolean
  ) {
    if (props.destinations) {
      clearCalculation();

      if (selected) {
        const stop = {
          destination,
          type: RouteStopTypeEnum.DELIVERY,
        } as RouteStop;

        formik.setFieldValue('stops', formik.values.stops.concat([stop]));
      } else {
        formik.setFieldValue(
          'stops',
          formik.values.stops.filter(
            (stop: RouteStop) => stop.destination?.id !== destination.id
          )
        );
      }
    }
  }

  function handleRouteStopTypeChange(
    routeStop: Partial<RouteStop>,
    type: RouteStopTypeEnum
  ) {
    const stops = [...formik.values.stops!];

    stops.forEach((stop) => {
      if (stop === routeStop) routeStop.type = type;
    });

    formik.setFieldValue('stops', stops);
  }

  async function handleCalculateClick() {
    const calcutation = await props.calculateFn({
      routeStops: formik.values.stops!,
      avgLoadTime: formik.values.avgLoadTime,
      estimatedStartDate: formik.values.estimatedStartDate!,
    });

    if (!calcutation) return;

    formik.setFieldValue('distance', calcutation.distance);
    formik.setFieldValue('duration', calcutation.duration);
    formik.setFieldValue('durationWithLoadTime', calcutation.durationWithLoadTime); // prettier-ignore
    formik.setFieldValue('estimatedStartDate', calcutation.estimatedStartDate); // prettier-ignore
    formik.setFieldValue('estimatedEndDate', calcutation.estimatedEndDate); // prettier-ignore
    formik.setFieldValue('geometry', calcutation.geometry);
    formik.setFieldValue('stops', calcutation.optimizedRouteStops);
  }

  function handleDriverSelect(event: any) {
    const driver = props.drivers!.find((d) => d.id === event.target.value);
    formik.setFieldValue('driver', driver);
  }

  function handleDelete() {
    props.onDelete();
  }

  useEffect(initializeFinalStop, [props.settings]);

  return (
    <div className="DashboardScreen RouteScreen">
      <div className="DashboardScreen_Header">
        <Typography variant="h5">
          Ruta: {formik.values.name || 'Sin Nombre'}
        </Typography>
        <Typography variant="subtitle1">
          Configure los detalles de la ruta.
        </Typography>
      </div>
      <Box maxWidth={1600}>
        <Paper>
          <Box margin={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Información General</Typography>
                <Typography variant="subtitle1">
                  Introduzca un nombre para la ruta y un transportista.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="name"
                  label="Nombre de Ruta"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formikUtils.fieldHasError('name')}
                  helperText={formikUtils.getFieldHint('name')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" style={{ width: '100%' }}>
                  <InputLabel>Transportista</InputLabel>
                  <Select
                    value={formik.values.driver && formik.values.driver.id}
                    onChange={handleDriverSelect}
                  >
                    {props.drivers &&
                      props.drivers.map((driver) => (
                        <MenuItem key={driver.id} value={driver.id}>
                          {driver.displayName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  name="avgLoadTime"
                  label="Tiempo promedio en cada parada"
                  variant="outlined"
                  value={formik.values.avgLoadTime}
                  onChange={formik.handleChange}
                  error={formikUtils.fieldHasError('avgLoadTime')}
                  helperText={formikUtils.getFieldHint('avgLoadTime')}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <KeyboardDateTimePicker
                  name="estimatedStartDate"
                  label="Fecha/Hora Inicio Estimada"
                  variant="inline"
                  inputVariant="outlined"
                  value={formik.values.estimatedStartDate}
                  onChange={(value) => {
                    formik.setFieldValue('estimatedStartDate', value);
                    clearEstimatedEndDate();
                  }}
                  error={formikUtils.fieldHasError('estimatedStartDate')}
                  helperText={formikUtils.getFieldHint('estimatedStartDate')}
                  format="dd/MM/yyyy hh:mm a"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <KeyboardDateTimePicker
                  name="estimatedEndDate"
                  label="Fecha/Hora Finalización Estimada"
                  variant="inline"
                  inputVariant="outlined"
                  value={formik.values.estimatedEndDate}
                  onChange={(value) => formik.setFieldValue('estimatedEndDate', value)} // prettier-ignore
                  error={formikUtils.fieldHasError('estimatedEndDate')}
                  helperText={formikUtils.getFieldHint('estimatedEndDate')}
                  format="dd/MM/yyyy hh:mm a"
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Distancia"
                  name="distance"
                  variant="outlined"
                  value={displayDistance(formik.values.distance)}
                  error={formikUtils.fieldHasError('distance')}
                  helperText={formikUtils.getFieldHint('distance')}
                  placeholder="Calcule la ruta"
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Duración"
                  name="duration"
                  variant="outlined"
                  value={displayDuration(formik.values.durationWithLoadTime)}
                  error={formikUtils.fieldHasError('duration')}
                  helperText={formikUtils.getFieldHint('duration')}
                  placeholder="Calcule la ruta"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: '1em' }}
                  disabled={formik.values.stops.length === 0}
                  onClick={handleCalculateClick}
                >
                  Optimizar Ruta
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '1em' }}
                  disabled={!formik.isValid}
                  onClick={() => formik.handleSubmit()}
                >
                  Salvar Cambios
                </Button>
                {props.route?.id && (
                  <Button
                    variant="outlined"
                    color="default"
                    startIcon={<DeleteIcon color="error" />}
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Eliminar Ruta
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
          <Box margin={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box marginBottom={2}>
                  <Typography variant="h6">Destinos</Typography>
                  <Typography variant="subtitle1">
                    Seleccione destinos para crear las paradas en la ruta.
                  </Typography>
                </Box>
                <TextField
                  label="Filtrar opciones"
                  variant="filled"
                  value={destinationsFilter}
                  onChange={(e) => setDestinationsFilter(e.target.value)}
                />
                <Box maxHeight={600} overflow="auto">
                  <List>
                    {(props.destinations || [])
                      .filter((dest) => !dest.isOwnCompany)
                      .filter(filterDestinations)
                      .map((destination) => (
                        <ListItem
                          key={destination.id}
                          role={undefined}
                          dense
                          button
                          onClick={console.log}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={formik.values.stops.some(
                                (stop) =>
                                  stop.destination?.id === destination.id
                              )}
                              onChange={(event, checked) =>
                                handleDestinationsChange(destination, checked)
                              }
                              tabIndex={-1}
                              disableRipple
                              color={true ? 'primary' : 'default'}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={destination.name}
                            secondary={`Código: ${
                              destination.code || 'Sin Código'
                            }`}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box marginBottom={2}>
                  <Typography variant="h6">Paradas</Typography>
                  <Typography variant="subtitle1">
                    Listados de paradas de la ruta en base a los destinos
                    seleccionados.
                  </Typography>
                </Box>
                {sortBy(formik.values.stops, 'waypointIndex').map(
                  (routeStop: Partial<RouteStop>) => (
                    <RouteStopCard
                      key={routeStop.destination?.id}
                      routeStop={routeStop}
                      onTypeChange={handleRouteStopTypeChange}
                    />
                  )
                )}
              </Grid>
            </Grid>
          </Box>

          <div style={{ display: 'flex' }}>
            <div className="RouteScreen_Map">
              <Map
                companyPlace={props.settings!.destination}
                routeStops={formik.values.stops as RouteStop[]}
                routeGeometry={formik.values.geometry as RouteGeometry}
                onDblClick={(lat, lng) => {}}
              />
            </div>
          </div>
        </Paper>
      </Box>
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Eliminar Ruta"
        body="¿Realmente desea eliminar esta ruta?"
        onCancel={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
