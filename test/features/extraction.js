import rally from './helpers/setup';

test.serial('JS compilation with vendor extraction config', t => {
    rally
        .js('resources/assets/js/app.js', 'js')
        .extract(['vue'], 'js/libraries.js');

    t.deepEqual(
        {
            '/js/app': [path.resolve('resources/assets/js/app.js')],
            '/js/libraries': ['vue']
        },
        buildConfig().entry
    );
});

test.serial(
    'vendor extraction with no output and no requested JS compilation throws an error',
    t => {
        rally.extract(['vue']);

        Rally.dispatch('init');

        t.throws(() => new WebpackConfig().build(), Error);
    }
);

test.serial('JS compilation with vendor extraction with default config', t => {
    rally.js('resources/assets/js/app.js', 'js').extract(['vue']);

    t.deepEqual(
        {
            '/js/app': [path.resolve('resources/assets/js/app.js')],
            '/js/vendor': ['vue']
        },
        buildConfig().entry
    );
});
