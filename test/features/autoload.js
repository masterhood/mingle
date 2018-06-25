import rally from './helpers/setup';

test.cb.serial('it handles library autoloading', t => {
    rally.autoload({
        jquery: ['$', 'window.jQuery'],
        'lodash.map': '_map',
    });

    compile(t, config => {
        let providePlugin = config.plugins.find(
            plugin => plugin.constructor.name === 'ProvidePlugin'
        );

        t.deepEqual(
            {
                $: 'jquery',
                'window.jQuery': 'jquery',
                '_map': ['lodash', 'map']
            },
            providePlugin.definitions
        );
    });
});
