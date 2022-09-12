import React from 'react';
import { Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating, useMediaQuery } from "@mui/material";
import { Movie as MovieOutlined, Language, Theaters, PlusOne, FavoriteBorder, FavoriteOutlined, Remove, ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetMovieQuery, useGetRecommendationsQuery } from '../../Services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCatergory';
import { MovieList } from '..';


const MovieInformation = () => {

    const { id } = useParams();
    const { data, isFetching, error } = useGetMovieQuery(id);
    const dispatch = useDispatch();
    const { data: recommendations, isFetching: isFetchingRecommendations } = useGetRecommendationsQuery({ movie_id: id, list: '/recommendations' });
    const classes = useStyles();
    const isMovieFavorited = false;
    const isMovieWatchlisted = true;

    const addToFavorites = () => {

    };
    const addToWatchlist = () => {

    };

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
    console.log(recommendations);
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
                <Typography variant='h5' gutterBottom style={{ marginTop: '10px' }}>Overview</Typography>
                <Typography style={{ marginBottom: '2rem' }}>{data.overview}</Typography>
                <Typography variant='h5' gutterBottom>Top Cast</Typography>
                <Grid item container spacing={2} style={{ marginTop: '10px' }}>
                    {data && data.credits.cast.slice(0, 6).map((character, i) =>
                    (character.profile_path && <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
                        <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                        <Typography color='textPrimary' style={{ textDecoration: 'none', }} >{character.name}</Typography>
                        <Typography color='textSecondary' variant='subtitle2'>{character.character}</Typography>
                    </Grid>
                    ))}</Grid>
                <Grid item style={{ marginTop: '2rem' }}>
                    <div className={classes.buttonContainer}>
                        <Grid item sx={12} sm={6} className={classes.buttonContainer}>
                            <ButtonGroup size='small' variant='outlined'>
                                <Button target="_blank" rel='noopener noreferrer' href={data.homepage} endIcon={<Language />} >website</Button>
                                <Button target="_blank" rel='noopener noreferrer' href={`https://imdb.com/title/${data.imdb_id}`} endIcon={<MovieOutlined />} >IMDB</Button>
                                <Button onClick={() => { }} href='#' endIcon={<Theaters />}>Trailers</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item sx={12} sm={6} className={classes.buttonContainer}>
                            <ButtonGroup size='medium' variant='outlined'>
                                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteOutlined /> : <FavoriteBorder />}>
                                    {isMovieFavorited ? 'Unfavorited' : 'Favorite'}
                                </Button>
                                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                                    WatchList</Button>
                                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                                    <Typography variant='subtitle2' component={Link} to='/' color='inherit' style={{ textDecoration: 'none' }}>Back</Typography>
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <Box marginTop='5rem' width='100%'>
                <Typography variant='h3' gutterBottom align='center'>You might also like</Typography>
                {recommendations ?
                    <MovieList movies={recommendations} numberOfMovies={12} /> : <Box>Nothing was found</Box>}
            </Box>
        </Grid>
    );
};

export default MovieInformation;
{/* <Typography align='center' variant='h6' gutterBottom>{data.overview}</Typography> */ }