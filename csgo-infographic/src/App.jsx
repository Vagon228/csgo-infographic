// src/App.jsx
import React from 'react';
import { Container, Typography, Box, CssBaseline, CircularProgress, Alert } from '@mui/material';
import { DataProvider, useData } from './DataContext';
import Filters from './Filters';
import SkinsTable from './SkinsTable';
import RarityChart from './RarityChart';

const Dashboard = () => {
  const { state } = useData();
  const { loading, error } = state;

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress />
    </Box>
  );

  if (error) return <Alert severity="error">Ошибка: {error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        CS:GO Инфографика скинов
      </Typography>
      <Filters />
      <SkinsTable />
      <RarityChart />
    </Container>
  );
};

function App() {
  return (
    <DataProvider>
      <CssBaseline />
      <Dashboard />
    </DataProvider>
  );
}

export default App;