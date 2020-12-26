import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import { Route, RouteStopTypeEnum } from '../../api';
import { format } from 'date-fns';
import colors from '../../utils/colors';

interface Props {
  open: boolean;
  route: Route;
  onClose: () => any;
}

export function RouteReportDialog(props: Props) {
  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" fullScreen>
      <DialogTitle>Imprimir Ruta</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        <DialogContentText>
          Imprima la ruta para su uso en el montaje y transporte de mercancías.
        </DialogContentText>
        <PDFViewer width="100%" style={{ flex: 1 }}>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.h1}>Ruta: {props.route.name}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.h2}>Detalles</Text>
              </View>
              <View style={[styles.section, { display: 'flex' }]}>
                <Text>Transportista: </Text>
                <Text style={[styles.light]}>
                  {props.route.driver?.displayName || 'N/D'}
                </Text>
              </View>
              <View style={[styles.section]}>
                <Text>Tiempo promedio por parada: </Text>
                <Text style={styles.light}>
                  {props.route.avgLoadTime || 0} minutos
                </Text>
              </View>
              <View style={[styles.section]}>
                <Text>Fecha/Hora Inicio Estimada: </Text>
                <Text style={styles.light}>
                  {props.route.estimatedStartDate
                    ? format(
                        new Date(props.route.estimatedStartDate),
                        'dd/mm/yyyy hh:MM a'
                      )
                    : 'N/D'}
                </Text>
              </View>
              <View style={[styles.section]}>
                <Text>Fecha/Hora Final Estimada: </Text>
                <Text style={styles.light}>
                  {props.route.estimatedEndDate
                    ? format(
                        new Date(props.route.estimatedEndDate),
                        'dd/mm/yyyy hh:MM a'
                      )
                    : 'N/D'}
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.h2}>Orden de Carga de Camión</Text>
              </View>
              {props.route.stops
                .filter((stop) => stop.type !== RouteStopTypeEnum.ARRIVAL)
                .filter((stop) => stop.type !== RouteStopTypeEnum.PICKUP)
                .reverse()
                .map((stop, index) => (
                  <View key={stop.id} style={styles.section}>
                    <Text>
                      {index + 1}. {stop.destination.name} (Código:{' '}
                      {stop.destination.code || 'N/D'})
                    </Text>
                  </View>
                ))}
            </Page>
          </Document>
        </PDFViewer>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
  light: {
    color: colors.primary,
  },
  section: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 12,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.primary,
  },
  h3: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  table: {
    width: '100%',
  },
  tableRow: {},
  tableCell: {},
});
