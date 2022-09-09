import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';
import { Typography, Box, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
const Profile = () => {
    const { user } = useSelector(userSelector);
    const favoriteMovies = [];//dumby array

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    };
    return (
        <Box >
            <Box justifyContent='space-between' display='flex'>
                <Typography variant='h4' gutterBottom>My Profile</Typography>
                <Button color='inherit' onClick={logout}>Logout &nbsp; <ExitToApp /></Button>
            </Box>
            {!favoriteMovies.length ?
                <Typography variant='h5'>
                    Add favorites or watchlist some movies to see them here!</Typography>
                : <Box>Favorite Movies</Box>}

        </Box>

    );
};

export default Profile;