import React from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import { MyLocation, Business } from "@material-ui/icons";
import { RouteStop, RouteGeometry, Destination } from "../../api";
import { Place } from "../../types";
import { drawDirections } from "../../utils/map";
import { Chip } from "@material-ui/core";

export interface MapProps {
  companyPlace?: Partial<Place> | Partial<Destination>;
  place?: Partial<Place> | Partial<Destination> | null | undefined;
  focusedPlace?: Place | null | undefined;
  routeStops?: RouteStop[];
  routeGeometry?: RouteGeometry;
  onDblClick: (latitude: number, longitude: number) => void;
}

export function Map(props: MapProps) {
  const mapRef = React.useRef<any>();

  const [viewport, setViewport] = React.useState<any>({
    width: "100%",
    height: "100%",
    latitude: 18.4861838,
    longitude: -69.9299827,
    zoom: 12,
  });

  // Focus place when passed via props
  React.useEffect(() => {
    if (!props.focusedPlace) return;
    setViewport({
      ...viewport,
      latitude: props.focusedPlace.latitude,
      longitude: props.focusedPlace.longitude,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.focusedPlace]);

  // Draw line string of the route
  React.useEffect(() => {
    setTimeout(() => {
      if (!props.routeGeometry) return;
      drawDirections(mapRef.current.getMap(), props.routeGeometry);
    }, 2000);
  }, [props.routeGeometry]);

  return (
    <ReactMapGL
      {...viewport}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/jeserodz/cjxln02dv0zgc1cntvo5k6kf3"
      mapboxApiAccessToken="pk.eyJ1IjoiamVzZXJvZHoiLCJhIjoiY2p4aTRlNms3MWU2bzNvcDZmeGJiaTJjdyJ9.ajEmSNssUbSb-00R15Sf1w"
      transitionInterpolator={new FlyToInterpolator()}
      onViewportChange={setViewport}
      onDblClick={({ lngLat }) => props.onDblClick(lngLat[1], lngLat[0])}
      doubleClickZoom={false}
      ref={mapRef}
    >
      {props.place && (
        <Marker
          latitude={props.place.latitude!}
          longitude={props.place.longitude!}
          offsetLeft={-20}
          offsetTop={-20}
        >
          <Chip
            color="primary"
            icon={<MyLocation />}
            label={props.place.name}
          />
        </Marker>
      )}

      {props.focusedPlace && (
        <Marker
          latitude={props.focusedPlace.latitude}
          longitude={props.focusedPlace.longitude}
          offsetLeft={-20}
          offsetTop={-20}
        >
          <Chip
            color="primary"
            icon={<MyLocation />}
            label={props.focusedPlace.name}
          />
        </Marker>
      )}

      {props.routeStops &&
        props.routeStops.map((stop) => (
          <Marker
            key={stop.destination.id}
            latitude={stop.destination.latitude}
            longitude={stop.destination.longitude}
            offsetLeft={-20}
            offsetTop={-20}
          >
            <Chip
              color="primary"
              icon={<MyLocation />}
              label={stop.destination.name}
            />
          </Marker>
        ))}

      {props.companyPlace && (
        <Marker
          latitude={props.companyPlace.latitude!}
          longitude={props.companyPlace.longitude!}
          offsetLeft={-20}
          offsetTop={-20}
        >
          <Chip
            color="primary"
            icon={<Business />}
            label={props.companyPlace.name}
          />
        </Marker>
      )}
    </ReactMapGL>
  );
}
