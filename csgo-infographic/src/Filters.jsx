// src/Filters.jsx
import React from 'react';
import { TextField, MenuItem, Box } from '@mui/material';
import { useData } from './DataContext';

const Filters = () => {
  const { state, dispatch } = useData();
  const { filters, skins } = state;

  const rarities = ['all', ...new Set(skins.map((s) => s.rarity?.name).filter(Boolean))];
  const weapons = ['all', ...new Set(skins.map((s) => s.weapon?.name).filter(Boolean))];

  const handleChange = (field) => (event) => {
    dispatch({ type: 'SET_FILTER', field, value: event.target.value });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <TextField label="Поиск по названию" variant="outlined" value={filters.search} onChange={handleChange('search')} sx={{ minWidth: 200 }} />
      <TextField select label="Редкость" value={filters.rarity} onChange={handleChange('rarity')} sx={{ minWidth: 150 }}>
        {rarities.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
      </TextField>
      <TextField select label="Оружие" value={filters.weapon} onChange={handleChange('weapon')} sx={{ minWidth: 150 }}>
        {weapons.map((w) => <MenuItem key={w} value={w}>{w}</MenuItem>)}
      </TextField>
    </Box>
  );
};

export default Filters;