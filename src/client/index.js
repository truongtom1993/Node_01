import './styles/index.scss';
import { calculateDifferent, renderResult, isShowGridPics } from './js/ultils';
import { checkName } from './js/validate';
import { apiGeonames, apiCurrentWeather, apiForecastWeather } from './js/api';
import { isShowLoader } from './js/loader';
import dayjs from 'dayjs';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $('#_cb1ffd');
const mainHomepageCards = $('#_d4af68');
const loader = $('.loader');

function getData(form) {
	const formData = new FormData(form);
	return formData;
}
loader.addEventListener(`wheel`, event => {
	event.preventDefault();
});

form.addEventListener(`submit`, event => {
	event.preventDefault();
	let dataGeonames;
	let pixaData;
	let pixaDataImages;
	const formData = getData(event.target);
	const location = formData.get('location');
	const date = formData.get('date');
	if (!checkName(location) || !checkName(date)) {
		return;
	}
	const URLgeoname = `http://localhost:1800/geonames?location=${location}&date=${date}`;
	const diff = calculateDifferent(date);
	const dateFormat = dayjs(date);
	if (diff < 0) {
		alert(`Please do not choose a date in the past`);
		$('#_8a7d5a').value = null;
		return;
	}
	isShowLoader(true);
	fetch(URLgeoname).then(async resGeonames => {
		dataGeonames = await resGeonames.json();

		if (diff >= 7) {
			apiForecastWeather(dataGeonames.lat, dataGeonames.lon, dataGeonames.key).then(async resWeather => {
				const result = await resWeather.json();
				const dataWeather = result.data;
				fetch(`http://localhost:1800/pixabay?location=${location}&number=7`).then(async resPixa => {
					const data = await resPixa.json();
					if (data) {
						pixaData = data;
						pixaDataImages = data.map(element => {
							return element.largeImageURL;
						});
					}
					if (pixaData.length > 0) {
						for (const index in pixaData) {
							renderResult(
								mainHomepageCards,
								location,
								dayjs(dataWeather[index].datetime),
								dataGeonames.countryName,
								dataWeather[index].weather.description,
								dataWeather[index].temp,
								pixaData[index].previewURL,
								pixaDataImages,
							);
						}
						isShowLoader(false);
					}
				});
			});
		} else {
			apiCurrentWeather(dataGeonames.lat, dataGeonames.lon, dataGeonames.key).then(async resWeather => {
				const result = await resWeather.json();
				const dataWeather = result.data;
				fetch(`http://localhost:1800/pixabay?location=${location}&number=1`).then(async resPixa => {
					const data = await resPixa.json();
					if (data) {
						pixaData = data;
						pixaDataImages = data.map(element => element.largeImageURL);
					}
					renderResult(
						mainHomepageCards,
						location,
						dateFormat,
						dataGeonames.countryName,
						dataWeather[0].weather.description,
						dataWeather[0].temp,
						pixaData[0].previewURL,
						pixaDataImages,
					);
					isShowLoader(false);
				});
			});
		}
	});
});
