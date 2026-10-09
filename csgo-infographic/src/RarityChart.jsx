// src/RarityChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from './DataContext';
import { Box, Typography } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B'];

const RarityChart = () => {
  const { state } = useData();
  const { filteredSkins } = state;

  const data = Object.entries(
    filteredSkins.reduce((acc, skin) => {
      const rarity = skin.rarity?.name || 'Unknown';
      acc[rarity] = (acc[rarity] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <Box sx={{ height: 400, mt: 3 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Распределение скинов по редкости
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RarityChart;