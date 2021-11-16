import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { getPlanetDetail } from "../../services/swapi";

export const PlanetDetails = () => {
	const [loading, setLoading] = useState(true);
	const [planet, setPlanet] = useState(true);
	const { planetId } = useParams();

	const loadDetail = useCallback(() => {
		setLoading(true);

		getPlanetDetail(planetId)
			.then(response => {
				setPlanet(response.result);
			})
			.catch(e => {
				console.log("error", e);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [planetId]);

	useEffect(() => {
		loadDetail();
	}, [loadDetail]);

	if (loading) {
		return (
			<div className="fas fa-circle-notch m-5 text-white d-flex justify-content-center">
				<span className="text-white">Loading...</span>
			</div>
		);
	}
	return (
		<div className="jumbotron justify-center p-5">
			<div className="d-flex flex-row">
				<div className="m-2">
					<img
						src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
						className="w-80"
						alt={planet.properties.name}
					/>
				</div>
				<div className="m-2 text-white">
					<h1 className="display-4 text-white">{planet.properties.name}</h1>
					<p>Description: {planet.description}</p>
					<p>Climate: {planet.properties.climate}</p>
					<p>Terrain: {planet.properties.terrain}</p>
					<p>Diameter: {planet.properties.diameter}</p>
				</div>
			</div>
			<hr className="my-4" />
			<Link to="/">
				<span className="btn btn-primary btn-lg ms-2" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

PlanetDetails.propTypes = {
	match: PropTypes.object
};
