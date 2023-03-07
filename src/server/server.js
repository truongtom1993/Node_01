const axios = require('axios').default;
const options = {
	key: '519de89339ef9bc76eef7bc1ecbd1d12',
	lang: 'en',
	model: 'general',
	url: 'https://www.meaningcloud.com/',
};
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
