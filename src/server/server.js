require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { apiGeonames, apiPixabay } = require('./api');
const app = express();
const PORT = process.env.PORT || 1800;

const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY || "69c7e8330d45484fb8234f5b3c9955e9";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

app.get('/', (req, res) => {
	res.sendFile('dist/index.html');
});

app.get('/geonames', (req, res) => {
	const location = req.query.location;
	const date = req.query?.date;
	let countryName;
	let lat;
	let lon;
	if (location && date) {
		apiGeonames(location).then(respond => {
			const geonames = respond.data?.geonames?.[0];
			if (geonames) {
				countryName = geonames.countryName;
				lat = geonames.lat;
				lon = geonames.lng;
				res.status(200).json({ countryName, lat, lon, key: WEATHERBIT_KEY });
			} else {
				res.sendStatus(500);
			}
		});
	}
});

app.get('/pixabay', (req, res) => {
	const location = req.query.location;
	let number = req.query.number;
	if (number < 3) {
		number = 3;
	}
	apiPixabay(location, number).then(responsePixa => {
		const data = responsePixa.data;
		res.status(200).json(data.hits);
	});
});

app.listen(PORT, () => {
	console.info(`🎁 The server is listen in port:  `, PORT);
});
