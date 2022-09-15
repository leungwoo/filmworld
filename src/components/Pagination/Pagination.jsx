import React from 'react';
import { Typography, Button } from '@mui/material';
import useStyles from './styles';

const Pagination = ({ currentPage, setPage, totalPages }) => {
    const classes = useStyles();

    const handlePrev = () => {
        if (currentPage !== 1)
            return setPage(prevCurrentPage => prevCurrentPage - 1);
    };
    const handleNext = () => {
        if (currentPage !== totalPages)
            return setPage(prevCurrentPage => prevCurrentPage + 1);
    };
    if (totalPages === 0) return 'null';
    return (
        <div className={classes.container}>
            {currentPage === 1 ? <Button disabled></Button> : <Button className={classes.button} type='button' variant='contained' color='primary' onClick={handlePrev}>Prev</Button>}
            <Typography variant='h4' className={classes.pageNumber}>{currentPage}</Typography>
            {currentPage === totalPages ? <Button disabled></Button> : <Button className={classes.button} type='button' variant='contained' color='primary' onClick={handleNext}>Next</Button>}
        </div>
    );
};

export default Pagination;