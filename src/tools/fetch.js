const SWAPI_URL = "https://www.swapi.tech/api/";

const baseOptions = {
	headers: {
		"Content-Type": "application/json"
	},
	mode: "cors"
};

export const customRequest = baseUrl => (endpoint, customsOptions) => {
	const url = `${baseUrl}${endpoint}`;
	const options = { ...baseOptions, ...customsOptions };

	return fetch(url, options).then(result => {
		return result.json();
	});
};

export const swapiRequest = customRequest(SWAPI_URL);
