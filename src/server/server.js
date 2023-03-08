require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const axios = require('axios').default;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const options = {
	key: '519de89339ef9bc76eef7bc1ecbd1d12',
	lang: 'en',
	model: 'general',
	url: 'https://www.meaningcloud.com/',
};
function callAPI() {
	const formdData = new FormData();
	formdData.append('key', options.key);
	formdData.append('lang', options.lang);
	formdData.append('model', options.model);
	formdData.append('url', options.url);
	axios
		.post('https://api.meaningcloud.com/sentiment-2.1', formdData)
		.then(res => console.info(`🎁 index.js	Line:5	ID:748284`, res.data))
		.catch(err => {
			console.info(`🎁 index.js	Line:7	ID:71fccf`, err);
		});
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));

app.get('/', (req, res) => {
	res.sendFile('dist/index.html');
});

app.listen(8080, () => {
	console.info(`🎁 src/server/server.js	Line:40	ID:1c72c8`);
});
