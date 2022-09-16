import React, { useState } from 'react';
import { Grid, Box, Typography, CircularProgress, Button } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from '../../Services/TMDB';
import { ArrowBack, MovieOutlined } from '@mui/icons-material';
import useStyles from './styles';
import MovieList from '../MovieList/MovieList';
import { Pagination } from '..';

const Actors = () => {
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [page, setPage] = useState(1);

    const { data, isFetching, error } = useGetActorsDetailsQuery(id);
    const { data: movies } = useGetMoviesByActorIdQuery({ actor_id: id, page });

    if (isFetching) {
        return <Box display='flex' justifyContent='center' alignItems="center">
            <CircularProgress size='8rem' />
        </Box>;
    }
    if (error) {
        return <Box display='flex' justifyContent='center' alignItems="center">
            <Button color='primary' startIcon={<ArrowBack />} onClick={() => history.goBack()} > go back</Button>
        </Box>;
    }

    return (

        <>
            <Grid container spacing={3}>
                <Grid item lg={5}>
                    <img className={classes.image}
                        src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
                        alt={data.name} />
                </Grid>
                <Grid item direction='column' justifyContent='center' align='left' lg={7} style={{ display: 'flex', marginTop: '20px' }}>
                    <Typography variant='h2' gutterBottom>{data.name}</Typography>
                    <Grid item>
                        <Typography variant='h5' gutterBottom>Born:{new Date(data.birthday).toDateString()}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' align='justify' paragraph>
                            {data.biography || 'Sorry no Bio as yet'}
                        </Typography>
                    </Grid>
                    <Box display='flex' marginTop='2rem' justifyContent='space-between'>
                        <Button
                            color='primary'
                            variant='contained'
                            target="_blank"
                            rel='noopener noreferrer'
                            href={`https://www.imdb.com/name/${data.imdb_id}`}
                            endIcon={<MovieOutlined />}>
                            IMDB
                        </Button>
                        <Button
                            variant='outlined'
                            startIcon={<ArrowBack />}
                            color='primary'
                            onClick={() => history.goBack()}>
                            Back
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Box marginTop='5rem' width='100%'>
                <Typography align='center' variant='h3' gutterBottom>Movies</Typography>
                {movies &&
                    <MovieList movies={movies} numberOfMovies={6} />
                }
            </Box>
            <Pagination
                currentPage={page}
                setPage={setPage}
                totalPages={data.total_pages}
            />
        </>
    );
};

export default Actors;