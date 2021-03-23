const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const context = __dirname + "/client/";

module.exports = (env, argv) => {
	const config = {
		name: "client",
		context,
		entry: {
			ui: "./index.tsx",
		},
		output: {
			filename: "[name].[contenthash].js",
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
		resolve: {
			alias: {
				react: "preact/compat",
				"react-dom/test-utils": "preact/test-utils",
				"react-dom": "preact/compat",
				// Must be below test-utils
			},
			extensions: [".ts", ".tsx", ".js", ".jsx"],
		},
		devtool:
			argv.mode === "production" ? "source-map" : "cheap-eval-source-map",
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
					options: {
						configFile: resolve(__dirname, "tsconfig.client.json"),
					},
					exclude: /node_modules/,
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						"style-loader",
						// Translates CSS into CommonJS
						"css-loader",
						// Compiles Sass to CSS
						"sass-loader",
					],
				},
				{
					test: /\.woff/,
					type: "asset/resource",
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: "../templates/index.html",
				hash: true,
				inject: "body",
			}),
		],
	};

	return config;
};
