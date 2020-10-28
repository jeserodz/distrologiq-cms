import React, { useState } from 'react';
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
  TableHead,
} from '@material-ui/core';
import { Formik } from 'formik';
import { User } from '../../api';
import { formSchema, initialValues } from './UserScreen.form';
import { SimpleDialog } from '../../components/SimpleDialog';
import colors from '../../utils/colors';

export interface UserScreenProps {
  user: User | undefined;
  onSubmit: (values: any) => void;
  onAnalyticsClick: (user: User) => void;
}

export function UserScreen(props: UserScreenProps) {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

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
                            color: 'white',
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
                            name="username"
                            label="Nombre de Usuario"
                            value={values.username}
                            onChange={handleChange}
                            error={!!errors.username}
                            helperText={errors.username}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="displayName"
                            label="Nombre Personal"
                            value={values.displayName}
                            onChange={handleChange}
                            error={!!errors.displayName}
                            helperText={errors.displayName}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
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
                        {props.user ? (
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
                        ) : (
                          <TableCell>
                            <TextField
                              name="password"
                              label="Contraseña"
                              value={values.password}
                              onChange={handleChange}
                              error={!!errors.password}
                              helperText={errors.password}
                              type="password"
                            />
                          </TableCell>
                        )}
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
                            color: 'white',
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
                    {props.user && (
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: 20 }}
                        onClick={() => props.onAnalyticsClick(props.user!)}
                      >
                        Ver Métricas
                      </Button>
                    )}
                    {props.user && (
                      <>
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{ marginRight: 20 }}
                          onClick={() => setPasswordModalOpen(true)}
                        >
                          Cambiar Contraseña
                        </Button>

                        <SimpleDialog
                          open={passwordModalOpen}
                          onClose={() => setPasswordModalOpen(false)}
                          onSubmit={(values) => {
                            props.onSubmit({ ...props.user, ...values });
                            setPasswordModalOpen(false);
                          }}
                        />
                      </>
                    )}
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
