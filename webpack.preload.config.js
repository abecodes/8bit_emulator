const { resolve } = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const context = __dirname + "/src/preload";

module.exports = (env, argv) => {
	const config = {
		name: "ipcRenderer",
		target: "electron-renderer",
		context,
		entry: {
			ipcRenderer: "./ipcRenderer/index.ts",
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
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"],
		},
		devtool:
			argv.mode === "production" ? "source-map" : "cheap-eval-source-map",
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: "ts-loader",
					options: {
						configFile: resolve(__dirname, "tsconfig.preload.json"),
					},
					exclude: /node_modules/,
				},
			],
		},
	};

	return config;
};
