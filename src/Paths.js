let argv = require('yargs').argv;

class Paths {
    /**
     * Create a new Paths instance.
     */
    constructor() {

		this.rootPath = argv['$0'].includes('ava')
			 ? path.resolve(__dirname, '../')
			 : path.resolve(__dirname, '../../../');
    }

    /**
     * Set the root path to resolve webpack.rally.js.
     *
     * @param {string} path
     */
    setRootPath(path) {
        this.rootPath = path;

        return this;
    }

    /**
     * Determine the path to the user's webpack.rally.js file.
     */
    rally() {
        return this.root(
            argv.env && argv.env.rallyfile ? argv.env.rallyfile : 'webpack.rally'
        );
    }

    /**
     * Determine the project root.
     *
     * @param {string|null} append
     */
    root(append = '') {
        return path.resolve(this.rootPath, append);
    }
}

module.exports = Paths;
