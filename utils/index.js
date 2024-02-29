const files = require.context("./", false, /\.js$/);
files.keys().forEach(key => {
	if(key !== './index.js') {
		// console.log(key, files(key));
		const { alias, default: utils } = files(key);
		uni[alias || ('$' + key.match(/^\.\/(.+)\.js$/)[1])] = utils;
	}
})