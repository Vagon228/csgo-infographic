// src/DataContext.jsx
import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { fetchSkins } from './api';

const DataContext = createContext();

const initialState = {
  skins: [],
  filteredSkins: [],
  loading: true,
  error: null,
  filters: { search: '', rarity: 'all', weapon: 'all' },
};

function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, skins: action.payload, filteredSkins: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, [action.field]: action.value } };
    case 'APPLY_FILTERS': {
      const { search, rarity, weapon } = state.filters;
      const filtered = state.skins.filter((skin) => {
        const matchesSearch = skin.name.toLowerCase().includes(search.toLowerCase());
        const matchesRarity = rarity === 'all' || skin.rarity?.name === rarity;
        const matchesWeapon = weapon === 'all' || skin.weapon?.name === weapon;
        return matchesSearch && matchesRarity && matchesWeapon;
      });
      return { ...state, filteredSkins: filtered };
    }
    default:
      return state;
  }
}

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    fetchSkins()
      .then((data) => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch((err) => dispatch({ type: 'FETCH_ERROR', payload: err.message }));
  }, []);

  useEffect(() => {
    dispatch({ type: 'APPLY_FILTERS' });
  }, [state.filters, state.skins]);

  return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);