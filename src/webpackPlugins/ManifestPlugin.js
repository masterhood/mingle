class ManifestPlugin {
    /**
     * Apply the plugin.
     *
     * @param {Object} compiler
     */
    apply(compiler) {
        compiler.plugin('emit', (curCompiler, callback) => {
            let stats = curCompiler.getStats().toJson();

            // Handle the creation of the rally-manifest.json file.
            Rally.manifest.transform(stats).refresh();

            callback();
        });
    }
}

module.exports = ManifestPlugin;
