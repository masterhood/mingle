
/**
 *	Welcome to Anomlay Mingle!
 *
 *	Anomlay Mingle provides a clean, fluent API for defining basic webpack build steps for your Anomlay ainglelication.
 *	Mix supports a variety of common CSS and JavaScript pre-processors out of the box.
 */

//	We'll begin by pulling in a few globals that Mix often uses.
require('./helpers');

global.path = require('path');
global.File = require('./File');


//	This config object is what Mix will reference, when it's time to dynamically build up your Webpack configuration object.
global.Config = require('./config')();
global.Mix = new (require('./Mix'))();


//	If we're working in a Olivia app, we'll explicitly set the default public path, as a convenience.
if (Mix.sees('olivia')) {
    Config.publicPath = 'public';
}


//	If the user activates hot reloading, with the --hot flag, we'll record it as a file, so that Olivia can detect it and
//	update its mix() url paths.
Mix.listen('init', () => {
    if (Mix.shouldHotReload()) {
        new File(
            path.join(Config.publicPath, 'hot')
        ).write('hot reloading');
    }
});

//	Mix exposes a simple, fluent API for activating many common build steps that a typical project should require. Behind
//	the scenes, all calls to this fluent API will update the above config.
let Api = require('./Api');
let api = new Api();

module.exports = api;
//	Deprecated.
module.exports.mix = api;
module.exports.config = Config;
