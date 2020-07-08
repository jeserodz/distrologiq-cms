import { gql } from "apollo-boost";
import {
  Destination,
  QueryDestinationArgs,
  MutationCreateDestinationArgs,
  MutationUpdateDestinationArgs
} from "../../graphql";

export interface GetDestinationVars extends QueryDestinationArgs {}

export interface GetDestinationData {
  destination: Destination;
}

export const GET_DESTINATION = gql`
  query GetDestination($id: ID!) {
    destination(id: $id) {
      id
      name
      email
      phone
      code
      references
      longitude
      latitude
    }
  }
`;

export interface CreateDestinationVars extends MutationCreateDestinationArgs {}

export interface CreateDestinationData {
  createDestination: Destination;
}

export const CREATE_DESTINATION = gql`
  mutation CreateDestination(
    $name: String!
    $email: String!
    $phone: String!
    $code: String!
    $references: String!
    $longitude: Float!
    $latitude: Float!
  ) {
    createDestination(
      name: $name
      email: $email
      phone: $phone
      code: $code
      references: $references
      longitude: $longitude
      latitude: $latitude
    ) {
      id
      name
      email
      phone
      code
      references
      longitude
      latitude
    }
  }
`;

export interface UpdateDestinationVars extends MutationUpdateDestinationArgs {}

export interface UpdateDestinationData {
  updateDestination: Destination;
}

export const UPDATE_DESTINATION = gql`
  mutation UpdateDestination(
    $id: ID!
    $name: String
    $email: String
    $phone: String
    $code: String
    $references: String
    $longitude: Float
    $latitude: Float
  ) {
    updateDestination(
      id: $id
      name: $name
      email: $email
      phone: $phone
      code: $code
      references: $references
      longitude: $longitude
      latitude: $latitude
    ) {
      id
      name
      email
      phone
      code
      references
      longitude
      latitude
    }
  }
`;
