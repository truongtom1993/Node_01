const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImagesConfigWebpackPlugin = require('image-config-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/client/index.js',
	mode: 'production',
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
				loader: 'url-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new ImagesConfigWebpackPlugin(),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
};
