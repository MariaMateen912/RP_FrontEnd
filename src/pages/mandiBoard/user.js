import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56'];

const UserStatsPage = () => {
  const [groupedStats, setGroupedStats] = useState({});
  const [chartData, setChartData] = useState([]);

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

        // Prepare data for Pie Chart
        const chartData = Object.entries(groupedData).map(([state, types]) => ({
          name: state,
          value: (types.Farmer || 0) + (types.Buyer || 0),
        }));
        
        setChartData(chartData);
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
    </Container>
  );
};

export default UserStatsPage;
