import React, { useCallback, useMemo, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { PeopleDetails } from "./views/peopleDetails";
import { VehicleDetails } from "./views/vehiclesDetails";
import { PlanetDetails } from "./views/planetsDetails";

import { Navbar } from "./component/navbar";

import { FavoritesContext } from "./store/favoritesContext";
import { getPeople, getPlanets, getVehicles } from "../services/swapi";

//create your first component
const Layout = () => {
	const [favorites, setFavorites] = useState([]);
	const [peoples, setPeoples] = useState([]);
	const [vehicles, setVehicles] = useState([]);
	const [planets, setPlanets] = useState([]);

	const loadPeople = useCallback(() => {
		getPeople().then(response => {
			setPeoples(response.results);
		});
	}, []);

	const loadPlanets = useCallback(() => {
		getPlanets().then(response => {
			setPlanets(response.results);
		});
	}, []);

	const loadVehicles = useCallback(() => {
		getVehicles().then(response => {
			setVehicles(response.results);
		});
	}, []);

	useEffect(() => {
		loadPeople();
		loadPlanets();
		loadVehicles();
	}, []);

	const onAddFavorites = useCallback(favorite => {
		setFavorites(allFavorites => {
			if (allFavorites.some(({ id }) => id === favorite.id)) {
				return allFavorites;
			}
			return [...allFavorites, favorite];
		});
	}, []);
	const favoriteContextValue = useMemo(() => ({ favorites, onAddFavorites }));
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<FavoritesContext.Provider value={favoriteContextValue}>
					<ScrollToTop>
						<Navbar />
						<Switch>
							<Route exact path="/">
								<Home peoples={peoples} vehicles={vehicles} planets={planets} />
							</Route>
							<Route exact path="/people/:peopleId">
								<PeopleDetails />
							</Route>
							<Route exact path="/vehicles/:vehicleId">
								<VehicleDetails />
							</Route>
							<Route exact path="/planets/:planetId">
								<PlanetDetails />
							</Route>
							<Route>
								<h1>Not found!</h1>
							</Route>
						</Switch>
					</ScrollToTop>
				</FavoritesContext.Provider>
			</BrowserRouter>
		</div>
	);
};

export default Layout;
