import rally from './helpers/setup';
import mockRequire from 'mock-require';

mockRequire(
    'browser-sync-webpack-plugin',
    class BrowserSyncPluginStub {
        apply() {}
    }
);

test.cb.serial('it handles Browsersync reloading', t => {
    let response = rally.browserSync('app.dev');

    t.is(rally, response);

    compile(t, config => {
        t.truthy(
            config.plugins.find(
                plugin => plugin.constructor.name === 'BrowserSyncPluginStub'
            )
        );
    });
});
