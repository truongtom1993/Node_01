// import dayjs from 'dayjs'
const dayjs = require('dayjs');

// export function createElement(name, options) {
// 	const element = document.createElement(name);

// 	const attributeList = Object.keys(options);
// 	if (attributeList.length > 0) {
// 		for (const key in attributeList) {
// 			if (Object.hasOwnProperty.call(attributeList, key)) {
// 				element[key] = options[key];
// 			}
// 		}
// 	}
// 	return element;
// }
// export function calculateDifferent(date) {

// }
const now = dayjs();
const date1 = dayjs('1993-01-03');

console.info(`🎁 src/client/js/ultils.js	Line:21	ID:e11406`, now.diff(date1, 'd'));
