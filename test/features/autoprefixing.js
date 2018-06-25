import rally from './helpers/setup';

test.serial(
    'Autoprefixer should always be applied after all other postcss plugins',
    t => {
        rally.sass('resources/assets/sass/sass.scss', 'public/css').options({
            postCss: [require('postcss-custom-properties')]
        });

        Rally.dispatch('init');

        let plugins = new WebpackConfig()
            .build()
            .module.rules.find(rule =>
                rule.test
                    .toString()
                    .includes(
                        path.normalize('/resources/assets/sass/sass.scss')
                    )
            )
            .use.find(loader => loader.loader == 'postcss-loader')
            .options.plugins.map(
                plugin => plugin.postcssPlugin || plugin().postcssPlugin
            );

        t.deepEqual(['postcss-custom-properties', 'autoprefixer'], plugins);
    }
);
