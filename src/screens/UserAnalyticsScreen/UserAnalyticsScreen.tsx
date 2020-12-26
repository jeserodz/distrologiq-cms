import React, { useContext } from 'react';
import { RouteComponentProps, useParams } from '@reach/router';
import { useQuery } from 'react-query';
import { Typography, Paper, Grid, Box } from '@material-ui/core'; // prettier-ignore
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush } from 'recharts'; // prettier-ignore
import { AnalyticsApi } from '../../api';
import { Context } from '../../Context';
import { displayDuration } from '../../utils/display-helpers';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';

export function UserAnalyticsScreen(props: RouteComponentProps) {
  const { id } = useParams();
  const context = useContext(Context);
  const analyticsApi = new AnalyticsApi(context.getApiConfig());

  const { data } = useQuery('getUserAnalytics', () =>
    analyticsApi.getUserAnalytics(id)
  );

  return data ? (
    <div className="DashboardScreen UserScreen">
      <div className="DashboardScreen_Header">
        <Typography variant="h5">
          Métricas de {data.user.displayName}
        </Typography>
      </div>
      <Box maxWidth={1200}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Box margin={1}>
              <Paper>
                <Box padding={1}>
                  <Typography variant="subtitle2">Rutas Asignadas</Typography>
                  <Typography variant="h4">
                    {data.assignedRoutesCount}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box margin={1}>
              <Paper>
                <Box padding={1}>
                  <Typography variant="subtitle2">Rutas Completadas</Typography>
                  <Typography variant="h4">
                    {data.completedRoutesCount}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box margin={1}>
              <Paper>
                <Box padding={1}>
                  <Typography variant="subtitle2">Rutas Pendientes</Typography>
                  <Typography variant="h4">
                    {data.pendingRoutesCount}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box margin={1}>
              <Paper>
                <Box padding={1}>
                  <Typography variant="subtitle2">Desempeño</Typography>
                  <Typography variant="h4">
                    {Math.round(data.averagePerformance * 100)}%
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box margin={1}>
              <Paper>
                <Box padding={1}>
                  <Typography variant="subtitle2">
                    Visitas por Ruta Promedio
                  </Typography>
                  <Typography variant="h4">{data.averageVisits}</Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box margin={1}>
              <Paper>
                <Box padding={1}>
                  <Typography variant="subtitle2">
                    Duración Ruta Promedio
                  </Typography>
                  <Typography variant="h4">
                    {displayDuration(data.averageRouteDuration)}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box margin={1}>
              <Paper>
                <Box padding={1}>
                  <Typography variant="subtitle2">
                    Desempeño Histórico
                  </Typography>
                  <Box padding={2}>
                    <ResponsiveContainer width="100%" minHeight={300}>
                      <BarChart
                        data={data.performanceHistoryChart}
                        barSize={50}
                        barGap={5}
                        barCategoryGap={25}
                        style={{ fontFamily: 'Roboto' }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis
                          tickFormatter={(value) =>
                            value ? displayDuration(value) : '0:00:00'
                          }
                        />
                        <XAxis dataKey="routeName" />
                        <Bar
                          name="Tiempo Estimado"
                          dataKey="duration"
                          fill="#433E31"
                        />
                        <Bar
                          name="Tiempo Completado"
                          dataKey="completedDuration"
                          fill="#D6A641"
                        />
                        <Tooltip
                          formatter={(value) =>
                            displayDuration(parseInt(String(value)))
                          }
                          cursor={{
                            fill: 'rgba(0,0,0,0.7)',
                          }}
                        />
                        <Legend verticalAlign="top" height={40} />
                        <Brush
                          dataKey="routeName"
                          height={30}
                          stroke="#D6A641"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  ) : (
    <LoadingOverlay />
  );
}
