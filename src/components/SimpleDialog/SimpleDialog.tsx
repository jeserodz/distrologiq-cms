import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { User } from "../../api";

export interface SimpleDialogProps {
  user?: User | undefined;
  onSubmit?: (values: any) => void;
  onClose: () => void;
  open: boolean;
  style?: any;
}

const formSchema = Yup.object().shape({
  password: Yup.string().required("Campo requerido"),
  confirmPassword: Yup.string()
    .required("Campo requerido")
    .test("matchPassword", "Ambas contraseñas deben ser iguales", function (
      value: String
    ) {
      return this.parent.password === value;
    }),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

const useStyles = makeStyles({
  dialogContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    minWidth: 500,
    padding: 33,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  dialogTitle: {
    paddingLeft: 0,
  },
  dialogInput: {
    marginBottom: 10,
  },
  dialogButtons: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
});

export function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;
  const classes = useStyles();

  function handleClose() {
    return onClose;
  }

  function handleSubmit(values: any) {
    console.log(values);
  }

  return (
    <Formik
      validationSchema={formSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleSubmit, handleChange }) => (
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
          style={props.style}
          className={classes.dialogContainer}
        >
          <div className={classes.contentContainer}>
            <DialogTitle
              id="simple-dialog-title"
              className={classes.dialogTitle}
            >
              Cambiar Contraseña
            </DialogTitle>
            <TextField
              label="Contraseña Nueva"
              className={classes.dialogInput}
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              helperText={errors.password}
              error={errors.password ? true : false}
              variant="outlined"
            />
            <TextField
              label="Confirmar Contraseña"
              className={classes.dialogInput}
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={values.confirmPassword}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              variant="outlined"
            />
            <DialogActions className={classes.dialogButtons}>
              <Button onClick={handleClose} color="default">
                Cancelar
              </Button>
              <Button onClick={() => handleSubmit()} color="primary">
                Cambiar
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      )}
    </Formik>
  );
}
