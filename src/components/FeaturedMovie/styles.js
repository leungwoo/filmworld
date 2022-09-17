import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    featuredCardContainer: {
        display: 'flex',
        marginBottom: '20px',
        justifyContent: 'center',
        textDecoration: 'none',
        height: '490px'
    },
    card: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    cardRoot: {
        position: 'relative'
    },
    cardMedia: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.575)',
        backgroundBlendMode: 'darken'

    },
    cardContent: {
        color: 'white',
        width: '40%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    cardContentRoot: {
        position: 'relative',
        backgroundColor: 'transparent'
    }
}));