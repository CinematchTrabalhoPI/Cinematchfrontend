import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2VlNDkxZjA0M2ExODg2ZWNkNWI2ZTkzMDM1NjkzMCIsIm5iZiI6MTc1OTUwOTI5NS43MzgsInN1YiI6IjY4ZGZmYjJmYzIzZmRjZTE5YmI3N2VjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NCkEvmJZlyl49UfX0fVSI76-Yk2dD9tDBKMV3ulA1SI`,
  },
});

export default api;