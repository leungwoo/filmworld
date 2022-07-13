import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    movie: {
        padding: '10px',
    },

    links: {
        alignItems: 'center',
        fontWeight: 'bold',
        textDecoration: 'none',
        [theme.breakpoints.up('xs')]: { display: 'flex', flexDirection: 'column' },
        '&:hover': {
            cursor: 'pointer',
            TextDecoration: 'none'
        },
    },
    image: {
        borderRadius: '20px',
        height: '300px',
        marginBottom: '10px',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'none',
            transform: 'scale(1.05)',
        },
    },
    title: {
        color: theme.palette.text.primary,
        textOverflow: 'ellipsis',
        width: '230px',
        overflow: 'hidden',
        marginTop: '10px',
        marginBottom: 0,
        textAlign: 'Center',
        whiteSpace: 'nowrap',
        padding: '8px',

    },

}));