const webpack = require("webpack");
const { resolve, join } = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const context = __dirname + "/tmp/";

module.exports = (env, argv) => {
	const config = {
		name: "app",
		target: "electron-main",
		context,
		entry: {
			app: "./index.js",
		},
		output: {
			filename: "[name].js",
			path: resolve(__dirname, "dist/"),
		},
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					test: /\.js(\?.*)?$/i,
					terserOptions: {
						output: {
							comments: /^\**!|@preserve|@license|@cc_on/i,
						},
					},
					extractComments: {
						condition: /^\**!|@preserve|@license|@cc_on/i,
						filename: (fileData) => {
							// The "fileData" argument contains object with "filename", "basename", "query" and "hash"
							return `${fileData.filename}.LICENSE.txt${fileData.query}`;
						},
						banner: (licenseFile) => {
							return `License information can be found in ${licenseFile}`;
						},
					},
				}),
			],
		},
	};

	return config;
};
