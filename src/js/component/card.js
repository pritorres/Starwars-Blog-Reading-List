import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { FavoritesContext } from "../store/favoritesContext";
import { baseUrlByType, routeUrlByType } from "../../tools/lookups";

const Card = ({ id, name, type }) => {
	const history = useHistory();
	const { onAddFavorites } = useContext(FavoritesContext);

	const handleOnCLick = () => {
		history.push(`/${routeUrlByType[type]}/${id}`);
	};

	const handleOnAddFavorite = () => {
		onAddFavorites({
			id,
			name,
			type
		});
	};

	return (
		<div className="card w-100">
			<img
				onClick={handleOnCLick}
				src={`https://starwars-visualguide.com/assets/img/${baseUrlByType[type]}/${id}.jpg`}
				className="card-img-top"
				alt={name}
			/>
			<div className="card-body d-flex flex-row justify-content-between">
				<h6 className="card-title">{name}</h6>
				<div>
					<button
						className="fa fa-heart text-warning border border-warning bg-transparent ms-3 btn btn btn-outline-warning"
						onClick={handleOnAddFavorite}
						type="button"></button>
				</div>
			</div>
		</div>
	);
};

Card.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string
};

export default Card;
