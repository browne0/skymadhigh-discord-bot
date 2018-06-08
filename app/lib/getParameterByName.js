export default function getParameterByName(name, url) {
	const fixedname = name.replace(/[\[\]]/g, '\\$&'); // eslint-disable-line
	const regex = new RegExp(`[?&]${fixedname}(=([^&#]*)|&|#|$)`);
	const results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
