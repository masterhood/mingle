import rally from './helpers/setup';

test.serial('rally.webpackConfig()', t => {
    // Test config passed as an object.
    let config = { context: 'changed' };
    let response = rally.webpackConfig(config);

    t.is(rally, response);

    t.deepEqual(config, Config.webpackConfig);

    // Test config passed via a callback.
    config = { context: 'changed again' };
    response = rally.webpackConfig(webpack => config);

    t.is(rally, response);

    t.deepEqual(config, Config.webpackConfig);
});

test.serial('Custom user config can be merged', t => {
    rally.webpackConfig({ context: 'changed' });

    t.is('changed', buildConfig().context);
});

test.serial('Custom user config can be merged as a callback function', t => {
    rally.webpackConfig(webpack => {
        return {
            context: 'changed'
        };
    });

    t.is('changed', buildConfig().context);
});
