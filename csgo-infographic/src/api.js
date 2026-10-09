// src/api.js
import axios from 'axios';

const BASE_URL = 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en';

export const fetchSkins = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/skins.json`);
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки скинов:", error);
    throw error;
  }
};