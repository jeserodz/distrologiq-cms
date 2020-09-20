import { RouteGeometry } from "../api";

export async function drawDirections(map: any, geometry: RouteGeometry) {
  if (map.getLayer("route")) {
    map.removeLayer("route");
    map.removeSource("route");
  }

  const geoJsonLayer = {
    id: "route",
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: geometry.type,
          coordinates: JSON.parse(geometry.coordinates),
        },
      },
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#0EB0F5",
      "line-width": 8,
    },
  };

  map.addLayer(geoJsonLayer);
}
