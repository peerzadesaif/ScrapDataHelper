import axios from "axios";


const fetchMovies = axios.create({
    baseURL: "https://www.imdb.com",
    headers: {
        Accept: "application/json",
    },
});


export const fetchMoviesList = () => {
    return fetchMovies.get('/search/title/?count=10&groups=top_10&sort=user_rating')
}