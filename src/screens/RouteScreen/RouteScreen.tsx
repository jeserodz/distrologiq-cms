import React, { useEffect } from "react";
import { sortBy } from "lodash";
import { Typography, Paper, TextField, Button } from "@material-ui/core";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { displayDistance, displayDuration } from "../../utils/display-helpers";
import { useFormik } from "formik";
import { RouteForm, formSchema, initialValues } from "./RouteScreen.form";
import { Map } from "../../components/Map";
import { CalculateRouteData } from "./RouteScreen.graphql";
import "./RouteScreen.css";
import { RouteStopCard } from "../../components/RouteStopCard";
import {
  Destination,
  User,
  RouteStop,
  RouteGeometry,
  Route,
  Settings,
  RouteStopType
} from "../../graphql";

export interface RouteScreenProps {
  route: Route | null;
  destinations: Destination[] | undefined;
  drivers: User[] | undefined;
  settings: Settings | undefined;
  calculateFn: (routeStops: RouteStop[]) => Promise<CalculateRouteData | undefined>;
  onSave: (route: Route | RouteForm) => void;
}

export function RouteScreen(props: RouteScreenProps) {
  const formik = useFormik<RouteForm>({
    initialValues: props.route || initialValues,
    validationSchema: formSchema,
    onSubmit: props.onSave,
    enableReinitialize: true,
    isInitialValid: false
  });

  function handleDestinationsChange(_: any, destinations: Destination[]) {
    clearCalculation();

    const oldStops = [...formik.values.stops];

    const newStops = destinations.map(destination => {
      const oldStop = oldStops.find(s => s.destination.id === destination.id);
      return {
        destination,
        type: oldStop ? oldStop.type : RouteStopType.Delivery,
        started: oldStop ? oldStop.started : null,
        completed: oldStop ? oldStop.completed : null
      };
    });

    formik.setFieldValue("stops", newStops);
  }

  function handleRouteStopTypeChange(routeStop: RouteStop, type: RouteStopType) {
    const stops = [...formik.values.stops];

    stops.forEach(stop => {
      if (stop === routeStop) routeStop.type = type;
    });

    formik.setFieldValue("stops", stops);
  }

  async function handleCalculateClick() {
    const data = await props.calculateFn(formik.values.stops);

    if (!data) return;

    formik.setFieldValue("distance", data.calculateRoute.distance);
    formik.setFieldValue("duration", data.calculateRoute.duration);
    formik.setFieldValue("durationWithLoadTime", data.calculateRoute.durationWithLoadTime);
    formik.setFieldValue("geometry", data.calculateRoute.geometry);
    formik.setFieldValue("stops", data.calculateRoute.optimizedRouteStops);
  }

  function clearCalculation() {
    formik.setFieldValue("distance", initialValues.distance);
    formik.setFieldValue("duration", initialValues.duration);
    formik.setFieldValue("durationWithLoadTime", initialValues.durationWithLoadTime);
    formik.setFieldValue("geometry", initialValues.geometry);
  }

  function handleDriverSelect(event: any) {
    const driver = props.drivers!.find(d => d.id === event.target.value);
    formik.setFieldValue("driver", driver);
  }

  function initializeFinalStop() {
    if (formik.values.stops.length === 0 && props.settings) {
      const finalStop = {
        type: RouteStopType.Arrival,
        destination: props.settings.destination,
        started: null,
        completed: null
      };
      formik.setFieldValue("stops", [finalStop]);
    }
  }

  useEffect(initializeFinalStop, [props.settings]);

  return (
    <div className="DashboardScreen RouteScreen">
      <div className="DashboardScreen_Header">
        <Typography variant="h5">Ruta: {formik.values.name || "Sin Nombre"}</Typography>
      </div>
      <Paper>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: "20%" }}>
                <TextField
                  name="name"
                  label="Nombre"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={!!formik.errors.name}
                  helperText={formik.errors.name}
                />
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel>Transportista</InputLabel>
                  <Select
                    value={formik.values.driver && formik.values.driver.id}
                    onChange={handleDriverSelect}
                  >
                    {props.drivers &&
                      props.drivers.map(driver => (
                        <MenuItem key={driver.id} value={driver.id}>
                          {driver.displayName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <TextField
                  label="Distancia"
                  name="distance"
                  variant="outlined"
                  value={displayDistance(formik.values.distance)}
                  error={!!formik.errors.distance}
                  helperText={formik.errors.distance}
                  placeholder="Calcule la ruta"
                  disabled
                />
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <TextField
                  label="Duración"
                  name="duration"
                  variant="outlined"
                  value={displayDuration(formik.values.duration)}
                  error={!!formik.errors.duration}
                  helperText={formik.errors.duration}
                  placeholder="Calcule la ruta"
                  disabled
                />
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: "1em" }}
                  disabled={formik.values.stops.length === 0}
                  onClick={handleCalculateClick}
                >
                  Calcular
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!formik.isValid}
                  onClick={() => formik.handleSubmit()}
                >
                  Guardar
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div style={{ display: "flex" }}>
          <div className="RouteScreen_Destinations">
            <Autocomplete
              style={{ marginBottom: "1em" }}
              multiple
              filterSelectedOptions
              options={(props.destinations || []).filter(dest => !dest.isOwnCompany)}
              getOptionLabel={(option: Destination) => option.name}
              value={formik.values.stops.map((stop: RouteStop) => stop.destination)}
              onChange={handleDestinationsChange}
              renderInput={params => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  label="Destinos"
                  placeholder="Seleccione destinos"
                  error={!!formik.errors.stops}
                  helperText={formik.errors.stops || " "}
                />
              )}
            />

            {sortBy(formik.values.stops, "waypointIndex").map((routeStop: RouteStop) => (
              <RouteStopCard
                key={routeStop!.destination.id}
                routeStop={routeStop}
                onTypeChange={handleRouteStopTypeChange}
              />
            ))}
          </div>
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
    </div>
  );
}
