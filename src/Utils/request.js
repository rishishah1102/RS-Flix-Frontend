const apikey = "b28dc611542b54183fe5ac7ee0e09be6";

const requests = {
    fetchNetflixOriginals: `/discover/tv?api_key=${apikey}&with_networks=213`,
    fetchTrendingDaily: `/trending/all/day?api_key=${apikey}&language=en-US`,
    fetchTrendingWeekly: `/trending/all/week?api_key=${apikey}&language=en-US`,
    fetchTopRated: `/movie/top_rated?api_key=${apikey}&language=en-US`,
    fetchPopular: `/movie/popular?api_key=${apikey}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${apikey}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${apikey}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${apikey}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${apikey}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${apikey}&with_genres=99`,
    fetchAdventureMovies: `/discover/movie?api_key=${apikey}&with_genres=12`,
    fetchAnimationMovies: `/discover/movie?api_key=${apikey}&with_genres=16`,
    fetchCrimeMovies: `/discover/movie?api_key=${apikey}&with_genres=80`,
    fetchDramaMovies: `/discover/movie?api_key=${apikey}&with_genres=18`,
    fetchFamilyMovies: `/discover/movie?api_key=${apikey}&with_genres=10751`,
    fetchFantasyMovies: `/discover/movie?api_key=${apikey}&with_genres=14`,
    fetchHistoryMovies: `/discover/movie?api_key=${apikey}&with_genres=36`,
    fetchMusicMovies: `/discover/movie?api_key=${apikey}&with_genres=10402`,
    fetchMysteryMovies: `/discover/movie?api_key=${apikey}&with_genres=9648`,
    fetchScienceFictionMovies: `/discover/movie?api_key=${apikey}&with_genres=878`,
    fetchTVMovies: `/discover/movie?api_key=${apikey}&with_genres=10770`,
    fetchThrillerMovies: `/discover/movie?api_key=${apikey}&with_genres=53`,
    fetchWarMovies: `/discover/movie?api_key=${apikey}&with_genres=10752`,
    fetchWesternMovies: `/discover/movie?api_key=${apikey}&with_genres=37`,
}

export default requests;

// https://api.themoviedb.org/3/genre/movie/list?api_key=b28dc611542b54183fe5ac7ee0e09be6&language=en-US -- 19 genres