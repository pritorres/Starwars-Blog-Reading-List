import { swapiRequest } from "../tools/fetch";

export const getPeople = () => {
	return swapiRequest(`people`);
};

export const getPeopleDetail = id => {
	return swapiRequest(`people/${id}`);
};

export const getVehicles = () => {
	return swapiRequest(`vehicles`);
};

export const getVehicleDetail = id => {
	return swapiRequest(`vehicles/${id}`);
};

export const getPlanets = () => {
	return swapiRequest(`planets`);
};

export const getPlanetDetail = id => {
	return swapiRequest(`planets/${id}`);
};
