const {checkKeyLength} = require('../checkKey')

describe('Passed checkKeyLength', () => {
	test('Passed checkKeyLength', () => {
		expect(checkKeyLength('truong')).toEqual(6);
	});
});
