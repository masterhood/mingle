import rally from './helpers/setup';

test.serial('rally.babelConfig()', t => {
    rally.babelConfig({
        plugins: ['some-babel-plugin']
    });

    t.true(Config.babel().plugins.includes('some-babel-plugin'));
});
