import { IMDB_API_AKEY } from "../constants";

const API_KEY = IMDB_API_AKEY;

const requests = {
	getTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
	getNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
	getTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	getActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	getComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	getHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	getRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	getDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
	getKidMovies: `/discover/movie?api_key=${API_KEY}&certification_country=US&certification.lte=G&sort_by=popularity.desc`,
	getDramaMovies: `/discover/movie?api_keyl8=${API_KEY}&with_genres=18&sort_by=vote_average.desc&vote_count.gte=10`,
	getSciFiMovie: `/discover/movie?api_key=${API_KEY}&with_genres=878&sort_by=vote_average.desc`
};

export default requests;