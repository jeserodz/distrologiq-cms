import React from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import { Formik } from "formik";
import { LoginForm, formSchema, initialValues } from "./LoginScreen.form";
import "./LoginScreen.css";

export interface LoginScreenProps {
  onSubmit: (values: LoginForm) => void;
}

export function LoginScreen(props: LoginScreenProps) {
  function handleSubmit(values: LoginForm) {
    props.onSubmit(values);
  }

  return (
    <div className="LoginScreen">
      <div className="LoginScreen_BgOverlay" />
      <Paper className="LoginContent">
        <div className="LoginContent_Logo" />
        <Formik validationSchema={formSchema} initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, errors, submitCount, handleSubmit, handleChange }) => (
            <form className="LoginContent_Form" onSubmit={handleSubmit}>
              <TextField
                className="LoginContent_TextField"
                label="Usuario"
                name="username"
                type="username"
                value={values.username}
                onChange={handleChange}
                helperText={errors.username}
                error={!!errors.username}
              />
              <TextField
                className="LoginContent_TextField"
                label="Contraseña"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                helperText={errors.password}
                error={!!errors.password}
              />
              <Button
                className="LoginContent_Submit"
                type="submit"
                variant="contained"
                color="primary"
              >
                Acceder
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  );
}
