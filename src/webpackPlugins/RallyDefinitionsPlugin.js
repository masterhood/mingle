let webpack = require('webpack');
let dotenv = require('dotenv');
let expand = require('dotenv-expand');

/**
 * Create a new plugin instance.
 *
 * @param {string} envPath
 */
function RallyDefinitionsPlugin(envPath) {
    expand(
        dotenv.config({
            path: envPath || Rally.paths.root('.env')
        })
    );
}

/**
 * Build up the necessary definitions and add them to the DefinePlugin.
 *
 * @param {Object|null} merge
 */
RallyDefinitionsPlugin.build = function(merge = {}) {
    return new webpack.DefinePlugin(
        new RallyDefinitionsPlugin().getDefinitions(merge)
    );
};

/**
 * Build all RALLY_ definitions for Webpack's DefinePlugin.
 *
 * @param {object} merge
 */
RallyDefinitionsPlugin.prototype.getDefinitions = function(merge) {
    let regex = /^RALLY_/i;

    // Filter out env vars that don't begin with RALLY_.
    let env = Object.keys(process.env)
        .filter(key => regex.test(key))
        .reduce((value, key) => {
            value[key] = process.env[key];

            return value;
        }, {});

    let values = Object.assign(env, merge);

    return {
        'process.env': Object.keys(values)
            // Stringify all values so they can be fed into Webpack's DefinePlugin.
            .reduce((value, key) => {
                value[key] = JSON.stringify(values[key]);

                return value;
            }, {})
    };
};

module.exports = RallyDefinitionsPlugin;
