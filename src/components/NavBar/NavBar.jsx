import React, { useEffect, useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from "@mui/material";
import { Menu, AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Sidebar, Search } from '..';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import useStyles from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import { userSelector, setUser } from '../../features/auth';

const NavBar = () => {
    const { isAuthenticated, user } = useSelector(userSelector);
    const [mobileOpen, setMobileOpen] = useState(false);
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width:600px)');
    const theme = useTheme();
    // const isAuthenticated = false; dummy variable
    const dispatch = useDispatch();
    console.log(user);

    const token = localStorage.getItem('request_token');
    const sessionIdFromLocalStorage = localStorage.getItem('session_id');

    useEffect(() => {
        const logInUser = async () => {
            if (token) {
                if (sessionIdFromLocalStorage) {

                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
                    dispatch(setUser(userData));
                } else {

                    const sessionId = await createSessionId();
                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
                    dispatch(setUser(userData));
                }
            }


        }; logInUser();
    }, [token]);

    return (
        <>
            <AppBar position='fixed'>
                <Toolbar className={classes.toolbar}>

                    {isMobile && (<IconButton
                        color='inherit'
                        edge='start'
                        style={{ outline: 'none' }}
                        onClick={() => setMobileOpen((prevMobileOpen) => (!prevMobileOpen))}
                        className={classes.menuButton}>
                        <Menu />
                    </IconButton>)}

                    <IconButton color='inherit' sx={{ ml: 1 }} onClick={() => { }}>
                        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>

                    {!isMobile && <Search />}

                    <div>
                        {!isAuthenticated ? (
                            <Button color='inherit' onClick={fetchToken}>
                                Login &nbsp; <AccountCircle />
                            </Button>
                        ) : (<Button color='inherit'
                            component={Link}
                            to={`/profile/:id`}
                            className={classes.linkButton}
                            onClick={() => { }}>
                            {!isMobile && <> My Movie &nbsp;</>}
                            <Avatar style={{ height: '30', width: '30' }} alt='Profile' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAM1BMVEWVu9////+QuN6Mtt3v9PrP3/Dp8PidwOGzzeelxePk7fb7/P6tyebY5fKhwuK50enC1+wrv6NNAAADhElEQVR4nO1b7XKsIAyFAIIoyvs/bcWu7t7WxYSbrDMdz592tjvmNJ8kEaVu3LhxoxkAYFYsv3xeuIE+ZJfiguRy6JcPPilejckO+gWDTaP6FAWAbPUBrPuMKUw+kv6NbMTFw3T43+9amISVAGGoyV+cIYgygLkuvmAWZADhXL7WcjoAj5GvtRdj0OEIdELioRJ//yLLqMCfBMATg5eQDw4rX2snoQKDVsCiAoGMiAvBDQKhCIlCIPEToFhAxgYU+Vqzi6e5gIATUIKwgD0QaT4o4IXXE4g0ApE9DpGVcAN/RbwJUH2AW/7lTnh9GF6eCREdwSv4u4OeRqDnlq+ARuAPHkhocchfCohhIHAuv/xUTPNCkcaEUI46iVENvjeV6k57fHPKn4YKAG2DTqY9v3w+gB4QyIwHFP5MINCZbsAREBOPVIGgAhRqTiflAQWYiiQyH3oyOM0FQjlgx3Q2rJ5k5Z9WZdlh+cqgejyWHJVvMBUGs/zGRFWWFsLLirKtevz0hwfUuI3phXZXYMYYHyo24dfmyIbtbzGOAktEo9Zd3db2g+ndCwfr+l1myRQ2K1ZvMCqkh93tvg4B5cvutOxN/b6zBP+gNaTAxWFdkx57Gjzw/ODVP3mWqUa5n+ZO7x4L6me1tO4/1fD7kSsOH7tQPfruW7oYmPld5i8WfnkwFC9589WhPTtVs66Nufdr6fe+z7G20G3Nz4hucLALzo+qjRkSvyU75dl0SDLEwVwNscENqBuKOhqMwKmAJhUgF9VYkL2AOpg8A/msDNU3NeiwVALMFiDbgDIOwYHYsvPGQAExDjyzC5STDIkAcTSNAWluxJsGv0FKhtxZoICUCShDSSxIw0tgq8RPDBQNnDXhTQQIjbuED5K8kD8PFhByoSEuCXFIeC+UCAJSGNAWVFgQFllGQr7WeALsh4FvoMsRjDIERmwYUPfEWKBbNJk0QEgEErWwAF0PqS8rYIGe41Nf18ACvVC+noBIJiZM8rm7og3o7uh6E1wdhozDmVcMWPGntxjaYHvSuXxkTkZpJM5IAGBOTJYY0tx0FQnAh4SYAtaF2xR8+waj3GfKsZnDEDPDDSgwZsqOnBw7lyfDtjkp18r87KoT4R02utlLXEArj/R9oXHsGIMtonuvZC+/QTHqNIY5u3LXrevKbTeX5zBOxWU+duUN9st+V134u3Hjxp/BF9+CJ/iNmwljAAAAAElFTkSuQmCC' />
                        </Button>)}
                    </div>
                    {isMobile && <Search />}
                </Toolbar>
            </AppBar>
            <div>
                <nav className={classes.drawer}>
                    {isMobile ? (<Drawer variant='temporary'
                        anchor='right'
                        open={mobileOpen}
                        onClose={() => setMobileOpen((prevMobileOpen) => (!prevMobileOpen))}
                        classes={{ paper: classes.drawerPaper }}
                        ModalProps={{ keepMounted: true }}>

                        <Sidebar setMobileOpen={setMobileOpen} />
                    </Drawer>

                    ) : (<Drawer className={{ paper: classes.drawerPaper }} variant='permanent' open>
                        <Sidebar setMobileOpen={setMobileOpen} />
                    </Drawer>)}
                </nav>
            </div>
        </>
    );
};

export default NavBar;