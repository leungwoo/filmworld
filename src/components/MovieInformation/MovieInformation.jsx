import React from 'react';
import { Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating, useMediaQuery } from "@mui/material";
import { Movie as Favorite, MovieIcon, Language, Theaters, PlusOne, FavoriteBorderOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetMovieQuery } from '../../Services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCatergory';


const MovieInformation = () => {

    const { id } = useParams();
    const { data, isFetching, error } = useGetMovieQuery(id);
    const classes = useStyles();
    const dispatch = useDispatch();

    if (isFetching) {
        return <Box display='flex' justifyContent='center' alignItems="center">
            <CircularProgress size='8rem' />
        </Box>;
    }
    if (error) {
        return <Box display='flex' justifyContent='center' alignItems="center">
            <Link to='/'> Something has gone wrong go back</Link>
        </Box>;
    }
    console.log(data);
    return (
        <Grid container className={classes.containerSpaceAround}>
            <Grid item sm={12} lg={4} >
                <img className={classes.poster}
                    src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                    alt={data.title} />
            </Grid>
            <Grid item container direction='column' lg={7}>
                <Typography variant='h3' align='center' gutterBottom>
                    {data.title} ({data.release_date.split('-')[0]})
                </Typography>
                <Typography align='center' variant='h5' gutterBottom>
                    {data.tagline}
                </Typography>
                <Grid item className={classes.containerSpaceAround}>
                    <Box display='flex' align='center'>
                        <Rating readOnly value={data.vote_average / 2} precision={0.1} />
                        <Typography variant='subtitle1' gutterBottom style={{ marginLeft: '10px' }}>{data.vote_average}/10</Typography>
                    </Box>
                    <Typography variant='h6' align='center' gutterBottom>
                        {data.runtime}mins |{data.spoken_languages[0].english_name}
                    </Typography>
                </Grid>
                <Grid item className={classes.genresContainer}>
                    {data.genres.map((genre) =>
                    (<Link key={genre.name}
                        className={classes.links}
                        to='/'
                        onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
                        <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} alt="genreimage" />
                        <Typography variant='subtitle1' color='textPrimary'>{genre.name}</Typography>
                    </Link>))}
                </Grid>
            </Grid>

        </Grid>
    );
};

export default MovieInformation;
{/* <Typography align='center' variant='h6' gutterBottom>{data.overview}</Typography> */ }