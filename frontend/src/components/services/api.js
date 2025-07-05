const API_KEY = "b6b24fac2368c958307592d24dfe7efa";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
const data = await response.json();
return response.json();
}

export const searchMovies = async (query) => {
const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
const data = await response.json();
return data.results;    
}