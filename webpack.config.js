const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


// let compName = process.env.DEV_PATH;
//
// let entry = "./src/components/"+ compName +"/demo/basic/index.js";
//
// if(/\//.test(compName)){
//     compName = compName.split('/')[0];
//     let demoName = compName.split('/')[1];
//     entry = "./src/components/"+ compName +"/demo/" + demoName + "/index.js";
// }


module.exports = {
	devtool: 'inline-source-map',
	devServer : {
		contentBase : "/",
		hot: true,
        open: true
	},
	entry: {
        app: ''
	},
	output: {
		filename: '[name].[hash].bundle.js',
		path: path.resolve(__dirname, '/')
    },
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	},
	resolve : {
		alias: {
			components: path.resolve(__dirname, 'src/components/'),
			assets: path.resolve(__dirname, 'src/assets/'),
            i18n: path.resolve(__dirname, 'src/i18n.js'),
		}
	},
	module: {
		rules : [{
			test : /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use : [
				"babel-loader"
			]
		},{
			test : /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: ["css-loader","postcss-loader"]
			})
		},{
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				use: ['css-loader', 'postcss-loader', 'less-loader'],
				fallback: 'style-loader'
			})
		},{
			test : /\.(png|svg|jpg|gif)$/,
			use : [{
				loader: 'file-loader',
				options: {
					name: 'images/[name].[hash:8].[ext]'
				}
			}]
		},{
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use : [
				"file-loader"
			]
		},{
            test: /\.ejs$/,
            use : [
                "ejs-compiled-loader?compileDebug"
            ]
        }]
	},
	plugins : [
		new ExtractTextPlugin("[name].[hash].css"),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor"
		}),
		new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template : "./example/index.html",
            inject : "body",
            hash : false
        })
	]
};

