import test from 'ava';
import rally from '../../src/index';
import RallyDefinitionsPlugin from '../../src/webpackPlugins/RallyDefinitionsPlugin';

test('it fetches the RALLY_ definitions properly', t => {
    const plugin = new RallyDefinitionsPlugin(
        path.resolve(__dirname, 'testing.env')
    );
    const RALLY_TESTING = '"123"';
    const NODE_ENV = '"production"';
    const definitions = plugin.getDefinitions({ NODE_ENV: 'production' });
    // Note that the definitions may contain more keys.
    // During a travis build with cached node modules, there's a RALLY_ARCHIVES entry, for example.
    t.is(RALLY_TESTING, definitions['process.env'].RALLY_TESTING);
    t.is(NODE_ENV, definitions['process.env'].NODE_ENV);
});
