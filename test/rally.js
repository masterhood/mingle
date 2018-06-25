import test from 'ava';
import rally from '../src/index';
import sinon from 'sinon';
import ComponentFactory from '../src/components/ComponentFactory';

test.beforeEach(t => {
    Config = require('../src/config')();
    Rally.tasks = [];
});

test('that it knows if it is being executed in a production environment', t => {
    Config.production = true;

    t.true(Rally.inProduction());
});

test('that it can check if a certain config item is truthy', t => {
    Config.versioning = true;

    t.true(Rally.isUsing('versioning'));
});

test('that it knows if it should watch files for changes', t => {
    process.argv.push('--watch');

    t.true(Rally.isWatching());
});

test('that it can add a custom file to the webpack asset list', t => {
    Rally.addAsset('foo');

    t.is('foo', Config.customAssets[0]);
});

test('that it can dispatch events', t => {
    let callback = sinon.spy();

    Rally.listen('some-event', callback);
    Rally.dispatch('some-event');

    t.true(callback.called);
});

test('that it can dispatch events using a function to determine the data', t => {
    let callback = sinon.spy();

    Rally.listen('some-event', callback);
    Rally.dispatch('some-event', () => 'foo');

    t.true(callback.calledWith('foo'));
});

test('that it can see if we are using a Ofcold app', t => {
    t.false(Rally.sees('ofcold'));

    new File('./artisan').write('all ofcold apps have one');

    t.true(Rally.sees('ofcold'));

    // Clean up.
    File.find('./artisan').delete();
});

test('that it detect if hot reloading should be enabled', t => {
    t.false(Rally.shouldHotReload());

    Config.hmr = true;

    t.true(Rally.shouldHotReload());
});

test('that it can add a task', t => {
    Rally.addTask('footask');

    t.is(1, Rally.tasks.length);
});

test('that it can fetch a registered component', t => {
    new ComponentFactory().installAll();

    let component = new class {
        register() {}
    }();

    rally.extend('foo', component);

    rally.foo();

    t.truthy(Rally.components.get('foo'));
    t.deepEqual(component, Rally.components.get('foo'));
});
