import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../Services/TMDB';
import { MovieList } from '..';
import { selectGenreOrCategory } from '../../features/currentGenreOrCatergory';


const Movies = () => {
    const [page, setPage] = useState(1);
    const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
    const { data, isFetching, error } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

    if (isFetching)
        return (
            <Box display='flex' justifyContent='center'>
                <CircularProgress size='4rem' />
            </Box>
        );


    if (!data.results.length)
        return (
            <Box display='flex' alignItems='center' mt='20px'>
                <Typography variant='h4'>
                    No movies with that name.
                    <br />
                    Please search for something else.
                </Typography>
            </Box>
        );

    if (error) return 'An error has occured';

    return (
        <div>
            <MovieList movies={data} />
        </div>
    );
};

export default Movies;