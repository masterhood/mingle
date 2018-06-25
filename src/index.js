/*
 * Welcome to Ofcold Mingle!
 *
 * Ofcold Mingle provides a clean, fluent API for defining basic webpack build steps for your Ofcold application. Mingle supports a variety
 * of common CSS and JavaScript pre-processors out of the box.
 */

/**
 * We'll begin by pulling in a few globals that Mingle often uses.
 */
require('./helpers');
require('dotenv').config();

global.path = require('path');
global.File = require('./File');

/**
 * This config object is what Mingle will reference, when it's time to dynamically build up your Webpack configuration
 * object.
 */
global.Config = require('./config')();
global.Mingle = new (require('./Mingle'))();

/**
 * If we're working in a Ofcold app, we'll explicitly set the default public path, as a convenience.
 */
if (Mingle.sees('ofcold')) {
    Config.publicPath = 'public';
}

/**
 * If the user activates hot reloading, with the --hot flag, we'll record it as a file, so that Ofcold can detect it and
 * update its mix() url paths.
 */

Mingle.listen('init', () => {
    if (Mingle.shouldHotReload()) {
        let http = process.argv.includes('--https') ? 'https' : 'http';

        new File(path.join(Config.publicPath, 'hot')).write(
            http +
                '://' +
                Config.hmrOptions.host +
                ':' +
                Config.hmrOptions.port +
                '/'
        );
    }
});

/**
 * Mingle exposes a simple, fluent API for activating many common build steps that a typical project should require.
 * Behind the scenes, all calls to this fluent API will update the above config.
 */
let Api = require('./Api');
let api = new Api();

module.exports = api;
module.exports.mingle = api; // Deprecated.
module.exports.config = Config;
