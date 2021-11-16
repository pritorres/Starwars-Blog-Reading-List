import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { getVehicleDetail } from "../../services/swapi";

export const VehicleDetails = () => {
	const [loading, setLoading] = useState(true);
	const [vehicle, setVehicle] = useState(true);
	const { vehicleId } = useParams();

	const loadDetail = useCallback(() => {
		setLoading(true);

		getVehicleDetail(vehicleId)
			.then(response => {
				setVehicle(response.result);
			})
			.catch(e => {
				console.log("error", e);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [vehicleId]);

	useEffect(() => {
		loadDetail();
	}, [loadDetail]);

	if (loading) {
		return (
			<div className="fas fa-circle-notch m-5 text-white d-flex justify-content-center ">
				<span className="text-white">Loading...</span>
			</div>
		);
	}

	return (
		<div className="jumbotron justify-center p-5">
			<div className="d-flex flex-row">
				<div className="m-2">
					<img
						src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
						className="w-80"
						alt={vehicle.properties.name}
					/>
				</div>
				<div className="m-2 text-white">
					<h1 className="display-4 text-white">{vehicle.properties.name}</h1>
					<p>Description: {vehicle.description}</p>
					<p>Model: {vehicle.properties.model}</p>
					<p>Cargo-capacity: {vehicle.properties.cargo_capacity}</p>
					<p>Passengers: {vehicle.properties.passengers}</p>
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

VehicleDetails.propTypes = {
	match: PropTypes.object
};
