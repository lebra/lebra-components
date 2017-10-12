const px2rem = require('postcss-px2rem')
module.exports = {
	plugins: [
        px2rem({remUnit: 75}),
		require('autoprefixer'),
        require('cssnano'),
	]
}
