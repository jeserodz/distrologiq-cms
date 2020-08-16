import React, { useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableRow,
  Button,
  TableCell,
  TableBody,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TableHead,
  Dialog,
} from "@material-ui/core";
import { Formik } from "formik";
import { User } from "distrologiq-sdk";
import { formSchema, initialValues } from "./UserScreen.form";
import { SimpleDialog } from "../../components/SimpleDialog";
import colors from "../../utils/colors";

export interface UserScreenProps {
  user: User | undefined;
  onSubmit: (values: any) => void;
}

export function UserScreen(props: UserScreenProps) {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  function handleClickOpen() {
    return setPasswordModalOpen(true);
  }

  function handleClose() {
    return setPasswordModalOpen(false);
  }

  function handleSubmit(values: any) {
    console.log(values);
    props.onSubmit(values);
  }

  return (
    <Formik
      validationSchema={formSchema}
      initialValues={props.user || initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleSubmit, handleChange, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="DashboardScreen UserScreen">
            <div className="DashboardScreen_Header">
              <Typography variant="h5">Usuario</Typography>
            </div>
            <Paper>
              <Table>
                <TableRow>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            backgroundColor: colors.primaryDark,
                            color: "white",
                          }}
                          colSpan={2}
                        >
                          Información General
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <TextField
                            name="id"
                            label="ID"
                            value={values.id}
                            onChange={handleChange}
                            error={!!errors.id}
                            helperText={errors.id}
                            disabled={true}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="username"
                            label="Usuario"
                            value={values.username}
                            onChange={handleChange}
                            error={!!errors.username}
                            helperText={errors.username}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TextField
                            name="displayName"
                            label="Nombre"
                            value={values.displayName}
                            onChange={handleChange}
                            error={!!errors.displayName}
                            helperText={errors.displayName}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableRow>
                <TableRow>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            backgroundColor: colors.primaryDark,
                            color: "white",
                          }}
                          colSpan={2}
                        >
                          Roles
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.roles?.admin || false}
                                // onChange={handleChange}
                                name="admin"
                                color="primary"
                              />
                            }
                            label="Administrador"
                          />
                        </TableCell>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.roles?.driver || false}
                                // onChange={handleChange}
                                name="driver"
                                color="primary"
                              />
                            }
                            label="Transportista"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginRight: 20 }}
                      onClick={handleClickOpen}
                    >
                      Cambiar Contraseña
                    </Button>
                    <SimpleDialog
                      open={passwordModalOpen}
                      onClose={handleClose}
                    />
                    <Button type="submit" variant="contained" color="primary">
                      Guardar
                    </Button>
                  </TableCell>
                </TableRow>
              </Table>
            </Paper>
          </div>
        </form>
      )}
    </Formik>
  );
}
