import ApolloClient from "apollo-boost";
import { Config } from "../config";
import { Toaster } from "./toaster";

export const client = new ApolloClient({
  uri: Config.GRAPHQL_URL,
  request: operation => {
    const headers: any = {};
    const token = localStorage.getItem("token");

    if (token) {
      headers.authorization = token;
    }

    operation.setContext({ headers });
  },
  onError: data => {
    if (data.graphQLErrors) {
      const errors = data.graphQLErrors.map(e => e.message).join(", ");
      Toaster.show("error", errors);
    }
  }
});
