import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', 
  '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
  '#61C0BF', '#6B5B95', '#FF6F61', '#6B4226', '#BC243C',
  '#34568B', '#FF7F50', '#2E8B57', '#4682B4', '#8A2BE2'
];

const UserStatsPage = () => {
  const [groupedStats, setGroupedStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [zeroUserStates, setZeroUserStates] = useState([]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/user-stats");

        // Group data by state
        const groupedData = response.data.reduce((acc, stat) => {
          if (!acc[stat.state]) {
            acc[stat.state] = { Farmer: 0, Buyer: 0 };
          }
          acc[stat.state][stat.registrationType] = stat.count;
          return acc;
        }, {});

        setGroupedStats(groupedData);

        // Prepare data for Pie Chart and separate out states with 0 users
        const chartData = [];
        const zeroUserStates = [];

        Object.entries(groupedData).forEach(([state, types]) => {
          const totalUsers = (types.Farmer || 0) + (types.Buyer || 0);
          if (totalUsers > 0) {
            chartData.push({
              name: state,
              value: totalUsers,
            });
          } else {
            zeroUserStates.push(state);
          }
        });

        setChartData(chartData);
        setZeroUserStates(zeroUserStates);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Registration Statistics by State
      </Typography>
      
      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* User Statistics Cards */}
      <Grid container spacing={3}>
        {Object.entries(groupedStats).map(([state, types], index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{state}</Typography>
                <Typography variant="body1">
                  Farmer registration: {types.Farmer || 0}
                </Typography>
                <Typography variant="body1">
                  Buyer registration: {types.Buyer || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* List of States with 0 Users */}
      {zeroUserStates.length > 0 && (
        <Typography variant="h6" gutterBottom style={{ marginTop: '2rem' }}>
          States with No User Registrations:
        </Typography>
      )}
      {zeroUserStates.map((state, index) => (
        <Typography key={index} variant="body1">
          {state}
        </Typography>
      ))}
    </Container>
  );
};

export default UserStatsPage;
