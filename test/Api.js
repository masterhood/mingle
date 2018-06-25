import test from 'ava';
import path from 'path';
import rally from '../src/index';
import ComponentFactory from '../src/components/ComponentFactory';

test.beforeEach(t => {
    Config = require('../src/config')();
    Rally.tasks = [];

    new ComponentFactory().installAll();
});

test('rally.setPublicPath()', t => {
    let response = rally.setPublicPath('somewhere/else');

    t.is(rally, response);

    t.is(path.normalize('somewhere/else'), Config.publicPath);

    // It will also trim any closing slashes.
    rally.setPublicPath('somewhere/else/');

    t.is(path.normalize('somewhere/else'), Config.publicPath);
});

test('rally.setResourceRoot()', t => {
    let response = rally.setResourceRoot('some/path');

    t.is(rally, response);

    t.is('some/path', Config.resourceRoot);
});

test('rally.then()', t => {
    let called = false;

    // rally.then() registers a "build" event listener.
    let response = rally.then(() => (called = true));

    t.is(rally, response);

    // Let's fire a "build" event, and make sure that
    // our callback handler is called, as expected.
    Rally.dispatch('build');

    t.true(called);
});

test('rally.options()', t => {
    rally.options({
        foo: 'bar'
    });

    t.is('bar', Config.foo);
});
