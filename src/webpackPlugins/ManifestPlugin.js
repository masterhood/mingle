class ManifestPlugin {
    /**
     * Apply the plugin.
     *
     * @param {Object} compiler
     */
    apply(compiler) {
        compiler.plugin('emit', (curCompiler, callback) => {
            let stats = curCompiler.getStats().toJson();

            // Handle the creation of the mingle-manifest.json file.
            Mingle.manifest.transform(stats).refresh();

            callback();
        });
    }
}

module.exports = ManifestPlugin;
