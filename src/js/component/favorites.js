import React, { useRef, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { routeUrlByType } from "../../tools/lookups";
import { FavoritesContext } from "../store/favoritesContext";

const Favorites = () => {
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [eliminarFav, setEliminarFav] = useState([]);
	const { favorites } = useContext(FavoritesContext);
	console.log(favorites, "favoritos");
	const buttonRef = useRef(null);

	const handleClickDetection = e => {
		if (buttonRef && !buttonRef.current.contains(e.target)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickDetection);

		return () => {
			document.removeEventListener("mousedown", handleClickDetection);
		};
	}, []);

	const handleGoTo = (id, type) => () => {
		history.push(`/${routeUrlByType[type]}/${id}`);
	};
	const handleDeleteFav = index => {
		let arrayFavoritos = favorites;
		let removeFav = eliminarFav;
		arrayFavoritos.splice(index, 1);
		setEliminarFav(removeFav - 1);
		setEliminarFav([...arrayFavoritos]);
	};

	return (
		<div className="btn-group" ref={buttonRef}>
			<button
				type="button"
				id="favs"
				ariaExpanded={open}
				className="btn btn-warning show rounded"
				onClick={() => {
					setOpen(true);
				}}>
				Favorites ({favorites.length})
			</button>
			<ul
				className={`dropdown-menu ${open ? "show" : ""}`}
				dataPopperPlacement="bottom-start"
				style={{
					position: "absolute",
					inset: "0px auto auto 0px",
					margin: "0px",
					transform: "translate3d(0px, 40px, 0px)"
				}}>
				{!favorites.length && " (Empty)"}
				{favorites.map(({ id, name, type }) => (
					<li
						key={`li-favorite-${id}`}
						aria-labelledby="favs"
						className="dropdown-item flex justify-content-between">
						<span
							className="fas fa-trash-alt text-black bg-transparent me-2"
							onClick={index => handleDeleteFav(index)}></span>
						<a onClick={handleGoTo(id, type)}>{name}</a>
						<a>x</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Favorites;
