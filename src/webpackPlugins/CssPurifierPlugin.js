let Purifier = require('purifycss-webpack');
let glob = require('glob');

class CssPurifierPlugin {
    /**
     * Build up the plugin.
     */
    static build() {
        let twigFiles = glob.sync(
            Rally.paths.root('resources/views/**/*.twig')
        );
        let vueFiles = glob.sync(
            Rally.paths.root('resources/assets/js/**/*.vue')
        );

        let paths = twigFiles.concat(vueFiles);

        if (Config.purifyCss.paths) {
            paths = paths.concat(Config.purifyCss.paths);
        }

        return new Purifier(
            Object.assign({}, Config.purifyCss, {
                paths,
                minimize: Rally.inProduction()
            })
        );
    }
}

module.exports = CssPurifierPlugin;
