import React from "react";
import { Link } from "react-router-dom";
import Favorites from "./favorites";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-dark mb-3 px-3 d-flex flex-row">
			<Link to="/">
				<img style={{ width: "150px", margin: "10px" }} alt="" src="/logo.png" />
			</Link>
			<div className="ml-auto">
				<Link to="/demo" />
				<Favorites />
			</div>
		</nav>
	);
};
