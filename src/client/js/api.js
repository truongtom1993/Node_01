function apiGeonames() {
	const cityName = 'Hanoi';
	const url = `https://api.geonames.org/searchJSON?name=${cityName}&maxRows=1&username=truongtom1993`;
	fetch(url)
		.then(async res => {
			const result = await res.json();
			console.info(`🎁 src/client/js/api.js	Line:6	ID:65d3f5`, result);
		})
		.catch(err => {
			console.info(`🎁 src/client/js/api.js	Line:10	ID:5d1254`, err);
		});
}
function apiCurrentWether(lat, lon, key) {
	const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${key}`;
	fetch(url)
		.then(async res => {
			const result = await res.json();
			console.info(`🎁 src/client/js/api.js	Line:15	ID:41d5aa`, result);
		})
		.catch(err => {
			console.info(`🎁 src/client/js/api.js	Line:18	ID:1a179c`, err);
		});
}
function apiForecastWether(lat, lon, key) {
	const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&days=7&lat=${lat}&lon=${lon}`;
	fetch(url)
		.then(async res => {
			const result = await res.json();
			console.info(`🎁 src/client/js/api.js	Line:15	ID:41d5aa`, result);
		})
		.catch(err => {
			console.info(`🎁 src/client/js/api.js	Line:18	ID:1a179c`, err);
		});
}
export { apiGeonames, apiCurrentWether, apiForecastWether };
