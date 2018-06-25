let mingle = require('../index');
let Assert = require('../Assert');
let webpackMerge = require('webpack-merge');

let components = [
    'JavaScript',
    'Preact',
    'React',
    'Coffee',
    'TypeScript',
    'FastSass',
    'Less',
    'Sass',
    'Stylus',
    'PostCss',
    'Css',
    'Browsersync',
    'Combine',
    'Copy',
    'Autoload',
    'Version',
    'Extend',
    'Extract',
    'Notifications',
    'DisableNotifications',
    'PurifyCss'
];

class ComponentFactory {
    /**
     * Install all default components.
     */
    installAll() {
        components
            .map(name => require(`./${name}`))
            .forEach(this.install.bind(this));
    }

    /**
     * Install a component.
     *
     * @param {Component} Component
     */
    install(Component) {
        let component =
            typeof Component === 'function' ? new Component() : Component;

        this.registerComponent(component);

        Mingle.listen('init', () => {
            if (!component.activated && !component.passive) {
                return;
            }

            component.dependencies && this.installDependencies(component);
            component.boot && component.boot();
            component.babelConfig && this.applyBabelConfig(component);

            Mingle.listen('loading-entry', entry => {
                if (component.webpackEntry) {
                    component.webpackEntry(entry);
                }
            });

            Mingle.listen('loading-rules', rules => {
                component.webpackRules && this.applyRules(rules, component);
            });

            Mingle.listen('loading-plugins', plugins => {
                component.webpackPlugins &&
                    this.applyPlugins(plugins, component);
            });

            Mingle.listen('configReady', config => {
                component.webpackConfig && component.webpackConfig(config);
            });
        });
    }

    /**
     * Register the component.
     *
     * @param {Object} component
     */
    registerComponent(component) {
        []
            .concat(
                typeof component.name === 'function'
                    ? component.name()
                    : component.constructor.name.toLowerCase()
            )
            .forEach(name => {
                mingle[name] = (...args) => {
                    Mingle.components.record(name, component);

                    component.caller = name;

                    component.register && component.register(...args);

                    component.activated = true;

                    return mingle;
                };

                // If we're dealing with a passive component that doesn't need to be explicitly triggered by the user,
                // we'll call it now.
                if (component.passive) {
                    mingle[name]();
                }

                // Components can optionally write to the Mingle API directly.
                if (component.mingle) {
                    Object.keys(component.mingle()).forEach(name => {
                        mingle[name] = component.mingle()[name];
                    });
                }
            });
    }

    /**
     * Install the component's dependencies.
     *
     * @param {Object} component
     */
    installDependencies(component) {
        []
            .concat(component.dependencies())
            .filter(dependency => dependency)
            .tap(dependencies => {
                Assert.dependencies(dependencies, component.requiresReload);
            });
    }

    /**
     *
     * Apply the Babel configuration for the component.
     *
     * @param {Object} component
     */
    applyBabelConfig(component) {
        Config.babelConfig = webpackMerge.smart(
            Config.babelConfig,
            component.babelConfig()
        );
    }

    /**
     *
     * Apply the webpack rules for the component.
     *
     * @param {Object} component
     */
    applyRules(rules, component) {
        tap(component.webpackRules(), newRules => {
            newRules && rules.push(...[].concat(newRules));
        });
    }

    /**
     *
     * Apply the webpack plugins for the component.
     *
     * @param {Object} component
     */
    applyPlugins(plugins, component) {
        tap(component.webpackPlugins(), newPlugins => {
            newPlugins && plugins.push(...[].concat(newPlugins));
        });
    }
}

module.exports = ComponentFactory;
