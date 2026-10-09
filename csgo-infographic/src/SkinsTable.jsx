// src/SkinsTable.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import { useData } from './DataContext';

const SkinsTable = () => {
  const { state } = useData();
  const { filteredSkins } = state;

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Изображение</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Оружие</TableCell>
            <TableCell>Редкость</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSkins.slice(0, 50).map((skin) => (
            <TableRow key={skin.id}>
              <TableCell><Avatar src={skin.image} alt={skin.name} variant="rounded" sx={{ width: 60, height: 40 }} /></TableCell>
              <TableCell>{skin.name}</TableCell>
              <TableCell>{skin.weapon?.name}</TableCell>
              <TableCell>{skin.rarity?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkinsTable;