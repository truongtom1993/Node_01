const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const idDevelopment = (process.env.NODE_ENV = 'development');

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
	entry: './src/client/index.js',
	devtool: 'source-map',
	stats: 'verbose',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		clean: isProduction ? true : false,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/client/views/index.html',
			favicon: './src/client/assets/logo.svg',
		}),
		new HtmlWebpackPlugin({
			template: './src/client/views/blog_post.html',
			filename: 'pages/blog_post.html',
			favicon: './src/client/assets/logo.svg',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/i,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.s[ac]ss$/i,
				use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
};

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';
		config.plugins.push(new MiniCssExtractPlugin());
	} else if (idDevelopment) {
		config.mode = 'development';
		config.devServer = {
			open: true,
			host: 'localhost',
		};
		config.plugins.push(
			new CleanWebpackPlugin({
				dry: true,
				verbose: true,
				cleanStaleWebpackAssets: true,
				protectWebpackAssets: false,
			}),
		);
	}
	return config;
};
