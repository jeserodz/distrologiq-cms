import { gql } from "apollo-boost";
import { User } from "../../graphql";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      displayName
      email
      roles
    }
  }
`;

export interface GetUsersData {
  users: User[];
}
