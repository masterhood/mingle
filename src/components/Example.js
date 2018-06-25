/**
 * This file represents an example component interface for Mingle. All new components can be "inserted" into Mingle, like so:
 *
 * // webpack.mingle.js
 *
 * mingle.extend('foo', new Example());
 *
 * mingle.foo();
 */

class Example {
    /**
     * The optional name to be used when called by Mingle.
     * Defaults to the class name, lowercased.
     *
     * Ex: mingle.example();
     *
     * @return {String|Array}
     */
    name() {
        // Example:
        // return 'example';
        // return ['example', 'alias'];
    }

    /**
     * All dependencies that should be installed by Mingle.
     *
     * @return {Array}
     */
    dependencies() {
        // Example:
        // return ['typeScript', 'ts'];
    }

    /**
     * Register the component.
     *
     * When your component is called, all user parameters
     * will be passed to this method.
     *
     * Ex: register(src, output) {}
     * Ex: mingle.yourPlugin('src/path', 'output/path');
     *
     * @param  {*} ...params
     * @return {void}
     *
     */
    register() {
        // Example:
        // this.config = { proxy: arg };
    }

    /**
     * Boot the component. This method is triggered after the
     * user's webpack.mingle.js file has executed.
     */
    boot() {
        // Example:
        // if (Config.options.foo) {}
    }

    /**
     * Append to the master Mingle webpack entry object.
     *
     * @param  {Entry} entry
     * @return {void}
     */
    webpackEntry(entry) {
        // Example:
        // entry.add('foo', 'bar');
    }

    /**
     * Rules to be merged with the master webpack loaders.
     *
     * @return {Array|Object}
     */
    webpackRules() {
        // Example:
        // return {
        //     test: /\.less$/,
        //     loaders: ['...']
        // });
    }

    /*
     * Plugins to be merged with the master webpack config.
     *
     * @return {Array|Object}
     */
    webpackPlugins() {
        // Example:
        // return new webpack.ProvidePlugin(this.aliases);
    }

    /**
     * Override the generated webpack configuration.
     *
     * @param  {Object} webpackConfig
     * @return {void}
     */
    webpackConfig(webpackConfig) {
        // Example:
        // webpackConfig.resolve.extensions.push('.ts', '.tsx');
    }

    /**
     * Babel config to be merged with Mingle's defaults.
     *
     * @return {Object}
     */
    babelConfig() {
        // Example:
        // return { presets: ['react'] };
    }
}

// Usage:
// mingle.extend('example', new Example());
