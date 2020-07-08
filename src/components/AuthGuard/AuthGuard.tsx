import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_CURRENT_USER, GetCurrentUserData } from "./AuthGuard.graphql";

export interface AuthGuardProps {
  children: any;
}

export function AuthGuard(props: AuthGuardProps) {
  const { data, error } = useQuery<GetCurrentUserData>(GET_CURRENT_USER);
  const history = useHistory();

  React.useEffect(() => {
    if (error) history.replace("/login");
  }, [data, error, history]);

  return props.children;
}
