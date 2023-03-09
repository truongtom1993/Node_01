import dayjs from 'dayjs';
const $ = document.querySelector.bind(document);

function createElement(name, options) {
	const element = document.createElement(name);
	if (options) {
		const attributeList = Object.keys(options);
		if (attributeList.length > 0) {
			for (const key in attributeList) {
				if (Object.hasOwnProperty.call(attributeList, key)) {
					element[key] = options[key];
				}
			}
		}
	}
	return element;
}
function calculateDifferent(date) {
	const now = dayjs();
	const futureDate = dayjs(date);
	const diff = futureDate.diff(now, 'd');
	return diff;
}

function renderResult(mainHomepageCards, location, datetime, nation, weather, temp, previewURL, pixaDataImages) {
	const cardHomepage = createCardHomepage(location, datetime.format('DD - MMMM - YYYY'), nation, weather, temp, previewURL, pixaDataImages);
	mainHomepageCards.appendChild(cardHomepage);
}

function createCardHomepage(
	location = 'Hà Nội',
	time = 'Feburary 19, 2023',
	nation = 'Viet Nam',
	weather = 'Good',
	temp = '24',
	previewURL = 'https://via.placeholder.com/150.webp/C5C5C5/FFFFFF/?text=Image',
	pixaDataImages = [],
) {
	const card = createElement('div');
	card.classList.add('card_homepage');
	card.innerHTML = `<div class="card_header">
	<img src="${previewURL}" alt="card Image" class="card_image">
	<div class="card_header_right">
		<h2 class="card_header_right_title">Your location: ${location}
		</h2>
		<div class="card_header_right_detail">
			<strong class="strong">${time}</strong>
		</div>
	</div>
</div>
<div class="card_content">
	<ul>
		<li><strong>Nation: </strong>${nation}</li>
		<li><strong>Wether: </strong>${weather}</li>
		<li><strong>Temp: </strong>${temp}</li>
	</ul>
</div>`;
	const button = document.createElement('button');
	button.classList.add('card_footer');
	button.addEventListener('click', event => {
		event.preventDefault();
		isShowGridPics(true, pixaDataImages);
	});
	button.innerHTML = `<a href="" class="continue_reading">See more picture >></a>`;
	card.appendChild(button);
	return card;
}

let gridPics;
function isShowGridPics(show, listImage) {
	if (!show && gridPics) {
		document.removeChild(gridPics);
	} else {
		gridPics = document.createElement(`div`);
		gridPics.className = 'grid_pics';
		gridPics.id = '_b56df1';
		const background = document.createElement(`div`);
		background.className = 'background';
		background.id = '_c3ac3d';
		gridPics.appendChild(background);
		const row = document.createElement(`div`);
		row.className = 'row';
		background.appendChild(row);

		if (listImage.length > 0) {
			const listImageLength = listImage.length;
			const number = 3;
			let content = '';
			for (let index = 0; index < listImageLength; index += number) {
				for (let i = index; i < number + index; i++) {
					if (i === listImageLength) {
						break;
					}
					content += `<img src="${listImage[i]}" alt="Image-${i}">`;
				}
				const column = document.createElement('div');
				column.classList.add('column');
				column.innerHTML = content;
				row.appendChild(column);
				content = '';
			}

			gridPics.addEventListener(`wheel`, event => {
				event.preventDefault();
			});
			gridPics.addEventListener(`click`, event => {
				event.target.classList.add('hidden');
			});
			background.addEventListener(`wheel`, event => {
				event.stopPropagation();
			});
			background.addEventListener(`click`, event => {
				event.stopPropagation();
			});
			document.body.appendChild(gridPics);
		}
	}
}

export { createElement, calculateDifferent, renderResult, createCardHomepage, isShowGridPics };
