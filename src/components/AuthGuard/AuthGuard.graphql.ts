import { gql } from "apollo-boost";
import { User } from "../../graphql";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      username
      displayName
    }
  }
`;

export interface GetCurrentUserData {
  me: User;
}
