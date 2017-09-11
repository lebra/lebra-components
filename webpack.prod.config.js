const path = require('path');
const webpack = require('webpack');


module.exports = {
	entry: {
		app: "./src/index.js"
	},
	output: {
		filename: 'lebra.js',
		path: path.resolve(__dirname, 'build/js'),
		library: 'lebra',
		libraryTarget: 'umd',
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	},
	resolve : {
		alias: {
			components: path.resolve(__dirname, 'src/components/'),
			assets: path.resolve(__dirname, 'src/assets/')
		}
	},
	module: {
		rules : [{
			test : /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use : [
				"babel-loader"
			]
		}]
	},
	plugins : [
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,  // remove all comments
			},
			compress: {
				warnings: false
			}
		})
	]
};

