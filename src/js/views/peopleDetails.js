import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { getPeopleDetail } from "../../services/swapi";

export const PeopleDetails = () => {
	const [loading, setLoading] = useState(true);
	const [people, setPeople] = useState(true);
	const { peopleId } = useParams();

	const loadDetail = useCallback(() => {
		setLoading(true);

		getPeopleDetail(peopleId)
			.then(response => {
				console.log("response", response);
				setPeople(response.result);
			})
			.catch(e => {
				console.log("error", e);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [peopleId]);

	useEffect(() => {
		loadDetail();
	}, [loadDetail]);

	if (loading) {
		return (
			<div className="fas fa-circle-notch m-5 text-white d-flex justify-content-center">
				<span className="text-white"> Loading...</span>
			</div>
		);
	}

	return (
		<div className="jumbotron justify-center p-5">
			<div className="d-flex flex-row">
				<div className="m-2">
					<img
						src={`https://starwars-visualguide.com/assets/img/characters/${people.uid}.jpg`}
						className="w-80"
						alt={people.properties.name}
					/>
				</div>
				<div className="m-2 text-white">
					<h1 className="display-4 text-white">{people.properties.name}</h1>
					<p>Description: {people.description}</p>
					<p>Gender: {people.properties.gender}</p>
					<p>Hair-color: {people.properties.hair_color}</p>
					<p>Height: {people.properties.height}</p>
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

PeopleDetails.propTypes = {
	match: PropTypes.object
};
