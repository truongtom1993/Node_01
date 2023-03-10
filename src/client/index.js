import dayjs from 'dayjs';
import { apiCurrentWeather, apiForecastWeather } from './js/api';
import { preventDefault } from './js/app';
import { isShowLoader } from './js/loader';
import { calculateDifferentFromNow, renderResult } from './js/ultils';
import { checkName } from './js/validate';
import './styles/index.scss';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $('#main_form');
const mainHomepageCards = $('#main_homepage_card');
const loader = $('.loader');
let localData = {};
let dataGeonames;
let pixaData;
let pixaDataImages;
let dataWeather;
let location;
function getData(form) {
	const formData = new FormData(form);
	return formData;
}
loader.addEventListener(`wheel`, preventDefault);

window.addEventListener('beforeunload', e => {
	// Save data to localstorage when browser close or reload
	if (Object.keys(localData).length > 0) {
		localStorage.setItem('localData', JSON.stringify(localData));
	}
});

document.addEventListener('DOMContentLoaded', e => {
	const data = localStorage.getItem('localData');
	// Load data from localstorage when the website load
	if (data) {
		localData = JSON.parse(data);
		const inputLocation = $('#location');
		const inputDate = $('#date');
		inputLocation.value = localData['location'] || '';
		inputDate.value = localData['date'];
		dataGeonames = localData.dataGeonames;
		pixaData = localData.pixaData;
		pixaDataImages = localData.pixaDataImages;
		dataWeather = localData.dataWeather;
		location = localData.location;

		for (const index in pixaData) {
			renderResult(
				mainHomepageCards,
				location,
				dayjs(dataWeather?.[index]?.datetime),
				dataGeonames?.countryName,
				dataWeather?.[index]?.weather?.description,
				dataWeather?.[index]?.temp,
				pixaData?.[index]?.previewURL,
				pixaDataImages,
			);
		}
	}
	form.addEventListener(`submit`, event => {
		event.preventDefault();

		const formData = getData(event.target);
		const location = formData.get('location');
		const date = formData.get('date');
		if (!checkName(location) || !checkName(date)) {
			return;
		}
		const URLgeoname = `geonames?location=${location}&date=${date}`;
		const diff = calculateDifferentFromNow(date);
		const dateFormat = dayjs(date);
		if (diff < 0) {
			alert(`Please do not choose a date in the past`);
			$('#date').value = null;
			return;
		}
		isShowLoader(true);
		localData.location = location;
		localData.date = date;
		fetch(URLgeoname).then(async resGeonames => {
			dataGeonames = await resGeonames.json();
			localData.dataGeonames = dataGeonames;
			if (diff >= 7) {
				apiForecastWeather(dataGeonames.lat, dataGeonames.lon, dataGeonames.key).then(async resWeather => {
					const result = await resWeather.json();
					dataWeather = result.data;
					localData.dataWeather = dataWeather;
					fetch(`pixabay?location=${location}&number=7`).then(async resPixa => {
						const data = await resPixa.json();
						if (data) {
							pixaData = data;
							pixaDataImages = data.map(element => {
								return element.largeImageURL;
							});
							localData.pixaData = pixaData;
							localData.pixaDataImages = pixaDataImages;
						}
						if (pixaData.length > 0) {
							$('#main_homepage_card').innerHTML = null;
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
					localData.dataWeather = dataWeather;
					fetch(`pixabay?location=${location}&number=1`).then(async resPixa => {
						const data = await resPixa.json();
						if (data) {
							pixaData = data;
							pixaDataImages = data.map(element => element.largeImageURL);
							localData.pixaData = pixaData;
							localData.pixaDataImages = pixaDataImages;
						}
						$('#main_homepage_card').innerHTML = null;
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
});
