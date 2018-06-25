class CustomTasksPlugin {
    /**
     * Apply the plugin.
     *
     * @param {Object} compiler
     */
    apply(compiler) {
        compiler.plugin('done', stats => {
            Rally.tasks.forEach(task => this.runTask(task, stats));

            if (Rally.components.get('version')) {
                this.applyVersioning();
            }

            if (Rally.inProduction()) {
                this.minifyAssets();
            }

            if (Rally.isWatching()) {
                Rally.tasks.forEach(task => task.watch(Rally.isPolling()));
            }

            Rally.manifest.refresh();
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
            Rally.manifest.add(asset.pathFromPublic());

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
        let tasks = Rally.tasks.filter(task => {
            return task.constructor.name !== 'VersionFilesTask' && task.constructor.name !== 'CopyFilesTask';
        });

        tasks.forEach(task => {
            task.assets.forEach(asset => {
                try {
                    asset.minify();
                } catch (e) {
                    console.log(
                        `Whoops! We had trouble minifying "${asset.relativePath()}". ` +
                            `Perhaps you need to use rally.babel() instead?`
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
        let manifest = Object.keys(Rally.manifest.get());

        manifest.forEach(file => Rally.manifest.hash(file));
    }
}

module.exports = CustomTasksPlugin;
