let JavaScript = require('./JavaScript');

class Preact extends JavaScript {
    /**
     * Required dependencies for the component.
     */
    dependencies() {
        return ['babel-preset-preact'].concat(super.dependencies());
    }

    /**
     * Babel config to be merged with Rally's defaults.
     */
    babelConfig() {
        return {
            presets: ['preact']
        };
    }
}

module.exports = Preact;
