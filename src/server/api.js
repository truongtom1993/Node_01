const axios = require('axios').default;
const ACCOUNNT_GEONAMES = process.env.ACCOUNNT_GEONAMES || "truongtom1993";
const PIXABAY_KEY = process.env.PIXABAY_KEY || '34226248-937434f860793fb4d293ee782';

function apiGeonames(name) {
	const url = `http://api.geonames.org/searchJSON?name=${name}&maxRows=1&username=${ACCOUNNT_GEONAMES}`;
	return axios.get(url);
}

function apiPixabay(name, number) {
	const url = `http://pixabay.com/api/?key=${PIXABAY_KEY}&per_page=${number}&image_type=photo&q=${name}`;
	return axios.get(url);
}

module.exports = {
	apiGeonames,
	apiPixabay,
};
