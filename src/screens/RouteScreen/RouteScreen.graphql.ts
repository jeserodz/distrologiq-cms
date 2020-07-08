import { gql } from "apollo-boost";
import { Route, Destination, User, Settings, CalculateRouteResponse } from "../../graphql";

export const GET_DATA = gql`
  query GetRoute($id: ID) {
    route(id: $id) {
      id
      name
      distance
      duration
      durationWithLoadTime
      started
      completed
      stops {
        id
        type
        waypointIndex
        destination {
          id
          name
          latitude
          longitude
        }
      }
      geometry {
        type
        coordinates
      }
      driver {
        id
        displayName
      }
    }
    destinations {
      id
      name
      latitude
      longitude
      isOwnCompany
    }
    users {
      id
      username
      displayName
    }
    settings {
      name
      avgLoadTime
      destination {
        id
        name
        longitude
        latitude
      }
    }
  }
`;

export const CREATE_ROUTE = gql`
  mutation CreateRoute(
    $name: String!
    $distance: Float!
    $duration: Float!
    $durationWithLoadTime: Float!
    $geometry: JSONObject!
    $stops: [JSONObject!]!
    $driver: JSONObject
  ) {
    createRoute(
      name: $name
      distance: $distance
      duration: $duration
      durationWithLoadTime: $durationWithLoadTime
      geometry: $geometry
      stops: $stops
      driver: $driver
    ) {
      id
    }
  }
`;

export const UPDATE_ROUTE = gql`
  mutation UpdaateRoute(
    $id: Int!
    $name: String
    $distance: Float
    $duration: Float
    $durationWithLoadTime: Float
    $geometry: JSONObject
    $stops: [JSONObject!]
    $driver: JSONObject
  ) {
    updateRoute(
      id: $id
      name: $name
      distance: $distance
      duration: $duration
      durationWithLoadTime: $durationWithLoadTime
      geometry: $geometry
      stops: $stops
      driver: $driver
    ) {
      id
    }
  }
`;

export const CALCULATE_ROUTE = gql`
  mutation CalculateRoute($routeStops: [JSONObject!]!) {
    calculateRoute(routeStops: $routeStops) {
      distance
      duration
      durationWithLoadTime
      geometry {
        type
        coordinates
      }
      optimizedRouteStops {
        id
        type
        waypointIndex
        destination {
          id
          name
          latitude
          longitude
        }
        started
        completed
      }
    }
  }
`;

export interface GetData {
  route: Route;
  destinations: Destination[];
  users: User[];
  settings: Settings;
}

export interface CalculateRouteData {
  calculateRoute: CalculateRouteResponse;
}
