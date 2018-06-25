import test from 'ava';
import rally from '../../src/index';
import WebpackConfig from '../../src/builder/WebpackConfig';
import sinon from 'sinon';
import ComponentFactory from '../../src/components/ComponentFactory';

new ComponentFactory().installAll();

test('rally can be extended with new functionality as a callback', t => {
    let registration = sinon.spy();

    rally.extend('foobar', registration);

    rally.foobar('baz', 'buzz');

    Rally.dispatch('init');

    let config = new WebpackConfig().build();

    t.true(registration.calledWith(config, 'baz', 'buzz'));
});

test('rally can be extended with new functionality as a class', t => {
    rally.extend(
        'foobar',
        new class {
            register(val) {
                t.is('baz', val);
            }
        }()
    );

    rally.foobar('baz');
});

test('dependencies can be requested for download', t => {
    let Assert = require('../../src/Assert');

    Assert.dependencies = sinon.spy();

    rally.extend(
        'foobar',
        new class {
            dependencies() {
                return ['npm-package'];
            }

            register() {}
        }()
    );

    rally.foobar();

    Rally.dispatch('init');

    t.true(Assert.dependencies.calledWith(['npm-package']));
});

test('webpack entry may be appended to', t => {
    rally.extend(
        'foobar',
        new class {
            register() {}

            webpackEntry(entry) {
                entry.add('foo', 'path');
            }
        }()
    );

    rally.foobar();

    Rally.dispatch('init');

    t.deepEqual(['path'], new WebpackConfig().build().entry.foo);
});

test('webpack rules may be added', t => {
    let rule = {
        test: /\.ext/,
        loaders: ['example-loader']
    };

    rally.extend(
        'foobar',
        new class {
            register() {}

            webpackRules() {
                return rule;
            }
        }()
    );

    rally.foobar();

    Rally.dispatch('init');

    let config = new WebpackConfig().build();

    t.deepEqual(config.module.rules.pop(), rule);
});

test('webpack plugins may be added', t => {
    let plugin = sinon.stub();

    rally.extend(
        'foobar',
        new class {
            register() {}

            webpackPlugins() {
                return plugin;
            }
        }()
    );

    rally.foobar();

    Rally.dispatch('init');

    let config = new WebpackConfig().build();

    t.is(plugin, config.plugins.pop());
});

test('custom Babel config may be merged', t => {
    rally.extend(
        'reactNext',
        new class {
            register() {}

            babelConfig() {
                return { presets: ['react-next'] };
            }
        }()
    );

    rally['reactNext']();

    Rally.dispatch('init');

    t.is('react-next', Config.babel().presets.pop());
});

test('the fully constructed webpack config object is available for modification, if needed', t => {
    rally.extend(
        'extension',
        new class {
            register() {}

            webpackConfig(config) {
                config.stats.hash = true;
            }
        }()
    );

    t.false(new WebpackConfig().build().stats.hash);

    rally.extension();

    Rally.dispatch('init');

    t.true(new WebpackConfig().build().stats.hash);
});

test('prior Rally components can be overwritten', t => {
    let component = {
        register: sinon.spy()
    };

    rally.extend('foo', component);

    let overridingComponent = {
        register: sinon.spy()
    };

    rally.extend('foo', overridingComponent);

    rally.foo();

    t.true(component.register.notCalled);
    t.true(overridingComponent.register.called);
});

test('components can be passive', t => {
    let stub = sinon.spy();

    let component = new class {
        register() {
            stub();
        }
    }();

    rally.extend('example', component);

    t.true(stub.notCalled);

    component = new class {
        constructor() {
            this.passive = true;
        }

        register() {
            stub();
        }
    }();

    rally.extend('example', component);

    t.true(stub.called);
});

test('components can manually hook into the rally API', t => {
    let component = new class {
        rally() {
            return {
                foo: arg => {
                    t.is('value', arg);
                },

                baz: arg => {
                    t.is('anotherValue', arg);
                }
            };
        }
    }();

    rally.extend('example', component);

    rally.foo('value');
    rally.baz('anotherValue');
});

test('components can be booted, after the webpack.rally.js configuration file has processed', t => {
    let stub = sinon.spy();

    let component = new class {
        boot() {
            stub();
        }
    }();

    rally.extend('example', component);

    rally.example();

    t.false(stub.called);

    Rally.dispatch('init');

    t.true(stub.called);
});
