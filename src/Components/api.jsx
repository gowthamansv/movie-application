import axios from 'axios';

const API_BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = '10b8a684'; 

export const fetchMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?i=${id}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    throw error;
  }
};

export const fetchMoviesBySearch = async (query, type = '', page = 1 , year=0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?s=${query}&type=${type}&page=${page}&y=${year}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by search:", error);
    throw error;
  }
};
