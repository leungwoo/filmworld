import React, { useState, useEfect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from "@mui/material";
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../Services/TMDB';
import { MovieList } from '..';


const Movies = () => {
    const { data, isFetching, error } = useGetMoviesQuery();
    //console.log(data);
    if (isFetching) {
        return (
            <Box display='flex' justifyContent='center'>
                <CircularProgress size='4rem' />
            </Box>
        );
    }

    if (!data.results.length) {
        return (
            <Box display='flex' alignItems='center' mt='20px'>
                <Typography variant='h4'>
                    No movies with that name.
                    <br />
                    Please search for something else.
                </Typography>
            </Box>
        );
    }
    if (error) return 'An error has occured';

    return (
        <div>
            <MovieList movies={data} />
        </div>
    );
};

export default Movies;