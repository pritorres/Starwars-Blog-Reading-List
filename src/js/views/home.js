import React from "react";
import PropTypes from "prop-types";

import "../../styles/home.scss";
import Card from "../component/card";

export const Home = ({ peoples, vehicles, planets }) => {
	return (
		<div className="bg-dark  mt-5">
			<h1 className="text-danger ms-3">Character:</h1>
			<div className="d-flex flex-row row row-cols-md-6 g-4 p-3">
				{peoples.map(people => (
					<div key={`people_item_${people.uid}`} className="col">
						<Card name={people.name} id={people.uid} type="people" />
					</div>
				))}
			</div>
			<br />
			<h1 className="text-danger ms-3">Vehicles:</h1>
			<div className="row row-cols-1 row-cols-md-6 g-4 p-3">
				{vehicles.map(vehicle => (
					<div key={`vehicle_item_${vehicle.uid}`} className="col">
						<Card name={vehicle.name} id={vehicle.uid} type="vehicle" />
					</div>
				))}
			</div>
			<br />
			<h1 className="text-danger ms-3">Planets:</h1>
			<div className="row row-cols-1 row-cols-md-6 g-4 p-3">
				{planets.map(planet => (
					<div key={`planet_item_${planet.uid}`} className="col">
						<Card name={planet.name} id={planet.uid} type="planet" />
					</div>
				))}
			</div>
		</div>
	);
};

Home.propTypes = {
	peoples: PropTypes.array,
	vehicles: PropTypes.array,
	planets: PropTypes.array
};
