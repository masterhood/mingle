/*
 |--------------------------------------------------------------------------
 | Welcome to Ofcold Rally!
 |--------------------------------------------------------------------------
 |
 | Ofcold Rally provides a clean, fluent API for defining basic webpack
 | build steps for your Ofcold application. Rally supports a variety
 | of common CSS and JavaScript pre-processors out of the box.
 |
 */

/**
 * We'll begin by pulling in a few globals that Rally often uses.
 */

require('./helpers');
require('dotenv').config();

global.path = require('path');
global.File = require('./File');

/**
 * This config object is what Rally will reference, when it's time
 * to dynamically build up your Webpack configuration object.
 */

global.Config = require('./config')();
global.Rally = new (require('./Rally'))();

/**
 * If we're working in a Ofcold app, we'll explicitly
 * set the default public path, as a convenience.
 */

if (Rally.sees('ofcold')) {
    Config.publicPath = 'public';
}

/**
 * If the user activates hot reloading, with the --hot
 * flag, we'll record it as a file, so that Ofcold
 * can detect it and update its rally() url paths.
 */

Rally.listen('init', () => {
    if (Rally.shouldHotReload()) {
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
 * Rally exposes a simple, fluent API for activating many common build
 * steps that a typical project should require. Behind the scenes,
 * all calls to this fluent API will update the above config.
 */

let Api = require('./Api');
let api = new Api();

module.exports = api;
module.exports.rally = api; // Deprecated.
module.exports.config = Config;
