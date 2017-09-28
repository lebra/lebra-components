module.exports = {
	plugins: [
        require('cssnano'),
        require('postcss-px2rem')({remUnit: 75}),
		require('autoprefixer'),
		require('css-mqpacker'),
	]
}
