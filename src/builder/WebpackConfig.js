let webpack = require('webpack');

let webpackDefaultConfig = require('./webpack-default');
let Entry = require('./Entry');
let webpackRules = require('./webpack-rules');
let webpackPlugins = require('./webpack-plugins');

process.noDeprecation = true;

class WebpackConfig {
	/**
	 * Create a new instance.
	 */
	constructor() {
		this.webpackConfig = webpackDefaultConfig();
	}

	/**
	 * Build the Webpack configuration object.
	 */
	build() {
		this.buildEntry()
			.buildOutput()
			.buildRules()
			.buildPlugins()
			.buildResolving()
			.mergeCustomConfig();

		Rally.dispatch('configReady', this.webpackConfig);

		return this.webpackConfig;
	}

	/**
	 * Build the entry object.
	 */
	buildEntry() {
		let entry = new Entry();

		if (! Rally.bundlingJavaScript) {
			entry.addDefault();
		}

		Rally.dispatch('loading-entry', entry);

		this.webpackConfig.entry = entry.get();

		return this;
	}

	/**
	 * Build the output object.
	 */
	buildOutput() {
		let http = process.argv.includes('--https') ? 'https' : 'http';

		if (Rally.isUsing('hmr')) {
			this.webpackConfig.devServer.host = Config.hmrOptions.host;
			this.webpackConfig.devServer.port = Config.hmrOptions.port;
		}

		this.webpackConfig.output = {
			path: path.resolve(Rally.isUsing('hmr') ? '/' : Config.publicPath),
			filename: '[name].js',
			chunkFilename: Rally.components.get('version') ? '[name].[hash].js' : '[name].js',
			publicPath: Rally.isUsing('hmr')
				? http +
				  '://' +
				  Config.hmrOptions.host +
				  ':' +
				  Config.hmrOptions.port +
				  '/'
				: '/'
		};

		return this;
	}

	/**
	 * Build the rules array.
	 */
	buildRules() {
		this.webpackConfig.module.rules = this.webpackConfig.module.rules.concat(
			webpackRules()
		);

		Rally.dispatch('loading-rules', this.webpackConfig.module.rules);

		return this;
	}

	/**
	 * Build the plugins array.
	 */
	buildPlugins() {
		this.webpackConfig.plugins = this.webpackConfig.plugins.concat(
			webpackPlugins()
		);

		Rally.dispatch('loading-plugins', this.webpackConfig.plugins);

		return this;
	}

	/**
	 * Build the resolve object.
	 */
	buildResolving() {
		this.webpackConfig.resolve = {
			extensions: ['*', '.js', '.jsx', '.vue'],

			alias: {
				vue$: 'vue/dist/vue.common.js'
			}
		};

		return this;
	}

	/**
	 * Merge the user's custom Webpack configuration.
	 */
	mergeCustomConfig() {
		if (Config.webpackConfig) {
			this.webpackConfig = require('webpack-merge').smart(
				this.webpackConfig,
				Config.webpackConfig
			);
		}
	}
}

module.exports = WebpackConfig;
