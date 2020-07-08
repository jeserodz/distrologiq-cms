import { gql } from "apollo-boost";
import { Route } from "../../graphql";

export const GET_ROUTES = gql`
  query GetRoutes {
    routes {
      id
      name
      distance
      duration
      durationWithLoadTime
      started
      completed
      completedDuration
      stops {
        id
      }
      driver {
        displayName
      }
    }
  }
`;

export interface GetRoutesData {
  routes: Route[];
}
