function apiGeonames(name) {
	const url = `http://api.geonames.org/searchJSON?name=${name}&maxRows=1&username=truongtom1993`;
	return fetch(url);
}
function apiCurrentWeather(lat, lon, key) {
	const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${key}`;
	return fetch(url);
}
function apiForecastWeather(lat, lon, key) {
	const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&days=7&lat=${lat}&lon=${lon}`;
	return fetch(url);
}
export { apiGeonames,  apiCurrentWeather, apiForecastWeather };
