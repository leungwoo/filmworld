import { ThemeContext } from '@emotion/react';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: '10px',
    },
    pageNumber: {
        margin: '0px 30px !important',
        color: theme.palette.text.primary,
    }

}));