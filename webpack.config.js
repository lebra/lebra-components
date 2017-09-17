const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');

console.log(process.env.ENV_LIB);

let compName = process.env.ENV_LIB;

let webpackConfig = {
	devtool: 'inline-source-map',
	devServer : {
		contentBase : "dist",
		hot: true,
        open: true
	},
	entry: {

	},
	output: {
		filename: '[name].[hash].bundle.js',
		path: path.resolve(__dirname, 'dist')
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
	]
};
let htmlEntrys = [];

// glob.sync("./src/components/" + compName + "/demo/*/index.js").forEach(path => {
//     console.log(path);
//     const chunk = path.split("demo/")[1].split("/index.js")[0];
//     webpackConfig.entry[chunk] = [path];
// });
//
// //多页面配置
// glob.sync("./src/components/" + compName + "/demo/*/index.js").forEach(compath => {
//     const chunk = compath.split("demo/")[1].split("/index.js")[0];
//     const filename = chunk + '.html';
//     const htmlConf = {
//         filename: filename,
//         template: './example/index.html',
//         inject: "body",
//         hash: false,
//     };
//     htmlEntrys.push(chunk);
//     webpackConfig.plugins.push(new HtmlWebpackPlugin(htmlConf));
// });




webpackConfig.plugins.push(
    new HtmlWebpackPlugin(
        {
            filename: 'index.html',
            title: 'demo',
            htmls: htmlEntrys,
            template: "./example/demo.ejs",
            inject: false,
            cache: false
        }
    )
)

console.log(webpackConfig);

module.exports = webpackConfig;
