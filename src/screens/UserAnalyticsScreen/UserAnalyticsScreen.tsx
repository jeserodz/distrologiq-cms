import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { AuthContext } from '../../contexts/AuthContext';
import { Typography, Paper, Grid, Box } from '@material-ui/core'; // prettier-ignore
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // prettier-ignore
import { AnalyticsService, UserAnalyticsDTO } from '../../api';
import Axios from 'axios';

const sampleData = [
  {
    name: 'Ruta A',
    duration: 4000,
    completedDuration: 2400,
  },
  {
    name: 'Ruta B',
    duration: 3000,
    completedDuration: 1398,
  },
  {
    name: 'Ruta B',
    duration: 2000,
    completedDuration: 9800,
  },
  {
    name: 'Ruta C',
    duration: 2780,
    completedDuration: 3908,
  },
];

export function UserAnalyticsScreen() {
  const { id } = useParams();
  const [chartWidth, setChartWidth] = React.useState(0);

  const { data } = useQuery(['getUserAnalytics', id], async () => {
    const { data } = await Axios.get<UserAnalyticsDTO>(
      'http://localhost:3000/analytics/users/' + id
    );
    return data;
  });

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
                    {data.averagePerformance * 100}%
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box margin={1}>
              <Paper>
                <Box padding={1}>
                  <Typography variant="subtitle2">Visitas Promedio</Typography>
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
                    Kilómetros Recorridos
                  </Typography>
                  <Typography variant="h4">
                    {data.accumulatedDistance}
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
                  <div
                    ref={(element) =>
                      setChartWidth(
                        element ? element.getBoundingClientRect().width : 0
                      )
                    }
                  >
                    <BarChart
                      width={chartWidth}
                      height={300}
                      data={sampleData}
                      margin={{
                        top: 30,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="duration" fill="#8884d8" />
                      <Bar dataKey="completedDuration" fill="#82ca9d" />
                    </BarChart>
                  </div>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  ) : null;
}
