import { gql } from "apollo-boost";
import { Destination } from "../../graphql";

export const GET_DESTINATIONS = gql`
  query GetDestinations {
    destinations {
      id
      name
      email
      phone
      code
    }
  }
`;

export interface GetDestinationsData {
  destinations: Destination[];
}
