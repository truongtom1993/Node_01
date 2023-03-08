const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImagesConfigWebpackPlugin = require('image-config-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	entry: './src/client/index.js',
	mode: 'development',
	devtool: 'source-map',
	stats: 'verbose',
	module: {
		rules: [
			{
				test: '/.js$/',
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			dry: true,
			verbose: true,
			cleanStaleWebpackAssets: true,
			protectWebpackAssets: false,
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new ImagesConfigWebpackPlugin(),
		new ExtractTextPlugin('site.css'),
	],
};
