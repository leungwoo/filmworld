import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../Services/TMDB';
import { MovieList, Pagination } from '..';



const Movies = () => {
    const [page, setPage] = useState(1);
    const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
    const { data, isFetching, error } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
    console.log(data);
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
            <MovieList movies={data} numberOfMovies={12} />
            <Pagination
                currentPage={page}
                setPage={setPage}
                totalPages={data.total_pages} />
        </div>
    );
};

export default Movies;