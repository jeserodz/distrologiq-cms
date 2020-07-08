import { gql } from "apollo-boost";
import { Token, MutationLoginArgs } from "../../graphql";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      jwt
      user {
        id
        username
        displayName
        email
      }
    }
  }
`;

export interface LoginData {
  login: Token;
}

export interface LoginVariables extends MutationLoginArgs {}
