import { gql } from "apollo-boost";
import { Place, QuerySearchPlacesArgs } from "../../graphql";

export interface SearchPlacesData {
  searchPlaces: {
    places: Place[];
  };
}

export interface SearchPlacesVars extends QuerySearchPlacesArgs {}

export const SEARCH_PLACES = gql`
  query SearchPlaces($query: String!) {
    searchPlaces(query: $query) {
      places {
        id
        name
        latitude
        longitude
      }
    }
  }
`;
