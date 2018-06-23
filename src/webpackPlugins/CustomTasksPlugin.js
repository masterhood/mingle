class CustomTasksPlugin {
    /**
     * Apply the plugin.
     *
     * @param {Object} compiler
     */
    apply(compiler) {
        compiler.plugin('done', stats => {
            Mingle.tasks.forEach(task => this.runTask(task, stats));

            if (Mingle.components.get('version')) {
                this.applyVersioning();
            }

            if (Mingle.inProduction()) {
                this.minifyAssets();
            }

            if (Mingle.isWatching()) {
                Mingle.tasks.forEach(task => task.watch(Mingle.isPolling()));
            }

            Mingle.manifest.refresh();
        });
    }

    /**
     * Execute the task.
     *
     * @param {Task} task
     */
    runTask(task, stats) {
        task.run();

        task.assets.forEach(asset => {
            Mingle.manifest.add(asset.pathFromPublic());

            // Update the Webpack assets list for better terminal output.
            stats.compilation.assets[asset.pathFromPublic()] = {
                size: () => asset.size(),
                emitted: true
            };
        });
    }

    /**
     * Minify the given asset file.
     */
    minifyAssets() {
        let tasks = Mingle.tasks.filter(task => {
            return task.constructor.name !== 'VersionFilesTask' && task.constructor.name !== 'CopyFilesTask';
        });

        tasks.forEach(task => {
            task.assets.forEach(asset => {
                try {
                    asset.minify();
                } catch (e) {
                    console.log(
                        `Whoops! We had trouble minifying "${asset.relativePath()}". ` +
                            `Perhaps you need to use mix.babel() instead?`
                    );

                    throw e;
                }
            });
        });
    }

    /**
     * Version all files that are present in the manifest.
     */
    applyVersioning() {
        let manifest = Object.keys(Mingle.manifest.get());

        manifest.forEach(file => Mingle.manifest.hash(file));
    }
}

module.exports = CustomTasksPlugin;
