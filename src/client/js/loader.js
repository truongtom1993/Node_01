const $ = document.querySelector.bind(document);
const loader = $('.loader');
function isShowLoader(show) {
	if (loader) {
		show ? loader.classList.remove('hidden') : loader.classList.add('hidden');
	}
}
export { isShowLoader  };
