import React from "react";
import styled from "styled-components";
import colors from "../../utils/colors";
import { RouteStop, RouteStopTypeEnum } from "../../api";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

interface RouteStopCardProps {
  routeStop: RouteStop;
  onTypeChange: (routeStop: RouteStop, type: RouteStopTypeEnum) => any;
}

const Container = styled.div<{ arrival: boolean }>`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  border: ${(p) => (p.arrival ? 3 : 1)}px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 1.1em;
  color: ${colors.primary};
  margin-bottom: 1em;
`;

export function RouteStopCard({ routeStop, onTypeChange }: RouteStopCardProps) {
  return (
    <Container arrival={routeStop.type === RouteStopTypeEnum.ARRIVAL}>
      <Title>{routeStop.destination.name}</Title>
      <FormControl style={{ width: "100%" }}>
        <InputLabel>Tipo de parada</InputLabel>
        <Select
          value={routeStop.type}
          onSelect={() => {}}
          onChange={(event) =>
            onTypeChange(routeStop, event.target.value as RouteStopTypeEnum)
          }
          disabled={routeStop.type === RouteStopTypeEnum.ARRIVAL}
        >
          <MenuItem value={RouteStopTypeEnum.DELIVERY}>Entrega</MenuItem>
          <MenuItem value={RouteStopTypeEnum.PICKUP}>Recogida</MenuItem>
          <MenuItem value={RouteStopTypeEnum.DELIVERYPICKUP}>
            Entrega y Recogida
          </MenuItem>
          <MenuItem value={RouteStopTypeEnum.ARRIVAL}>Llegada</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
}
