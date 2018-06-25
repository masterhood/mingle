let assert = require('assert');
let Dependencies = require('./Dependencies');
let argv = require('yargs').argv;

class Assert {
    /**
     * Assert that the call the mingle.js() is valid.
     *
     * @param {*} entry
     * @param {*} output
     */
    static js(entry, output) {
        assert(
            typeof entry === 'string' || Array.isArray(entry),
            'mingle.js() is missing required parameter 1: entry'
        );

        assert(
            typeof output === 'string',
            'mingle.js() is missing required parameter 2: output'
        );
    }

    /**
     * Assert that the calls to mingle.sass() and mingle.less() are valid.
     *
     * @param {string} type
     * @param {string} src
     * @param {string} output
     */
    static preprocessor(type, src, output) {
        assert(
            typeof src === 'string',
            `mingle.${type}() is missing required parameter 1: src`
        );

        assert(
            typeof output === 'string',
            `mingle.${type}() is missing required parameter 2: output`
        );
    }

    /**
     * Assert that calls to mingle.combine() are valid.
     *
     * @param {string} src
     * @param {File}   output
     */
    static combine(src, output) {
        assert(
            output.isFile(),
            'mingle.combine() requires a full output file path as the second argument.'
        );
    }

    /**
     * Assert that the given file exists.
     *
     * @param {string} file
     */
    static exists(file) {
        assert(
            File.exists(file),
            `Whoops, you are trying to compile ${file}, but that file does not exist.`
        );
    }

    /**
     * Assert that the necessary dependencies are available.
     *
     * @param {Array}  list
     * @param {Boolean} abortOnComplete
     */
    static dependencies(dependencies, abortOnComplete = false) {
        if (argv['$0'].includes('ava')) return;

        new Dependencies(dependencies).install(abortOnComplete);
    }
}

module.exports = Assert;
