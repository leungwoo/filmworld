import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import useStyles from "./styles";
import useAlan from './Alan';

import { Actors, Profile, NavBar, MovieInformation, Movies } from "./";

const App = () => {
	const alanBtnContainer = useRef();
	useAlan(); //how to use the custom hook.

	const classes = useStyles();
	return (
		<div className={classes.root}>

			<CssBaseline />
			<NavBar />
			<main className={classes.content}>
				<div className={classes.toolbar} >
					<Switch>
						<Route exact path="/movie/:id">
							<MovieInformation />
						</Route>
						<Route exact path="/actors/:id">
							<Actors />
						</Route>
						<Route exact path={["/", "/approved"]}>
							<Movies />
						</Route>
						<Route exact path="/profile/:id">
							<Profile />
						</Route>
					</Switch>
				</div>
			</main>
			<div ref={alanBtnContainer} />
		</div>
	);
};
export default App;
