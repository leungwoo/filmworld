import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;


export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({

        //Get genre
        getGenres: builder.query({
            query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
        }),

        //Get movies by [Type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                //* Get Movies by Search
                if (searchQuery) {
                    return `search/movie?api_key=${tmdbApiKey}&query=${searchQuery}&page=${page}`;
                }
                //*Get movies by Category

                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "string") {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
                //*Get movies by Genre
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "number") {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }
                //*Get Popular movies as default
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),
        //Get Movie information
        getMovie: builder.query({
            query: (id) => `/movie/${id}?api_key=${tmdbApiKey}&append_to_response=videos,credits`
        }),
        //Get User Specific List
        getRecommendations: builder.query({
            query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
        }),
        //Get actor details
        getActorsDetails: builder.query({
            query: (id) => `/person/${id}?api_key=${tmdbApiKey}`
        }),
        //Get Actor Movies
        getMoviesByActorId: builder.query({
            query: ({ id, page }) => `/discover/movie?api_key=${tmdbApiKey}&with_cast=${id}&page=${page} `
        })
    }),
});
export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorsDetailsQuery,
    useGetMoviesByActorIdQuery } = tmdbApi;;
