let AutomaticComponent = require('./AutomaticComponent');

class Notifications extends AutomaticComponent {
    /**
     * webpack plugins to be appended to the master config.
     */
    webpackPlugins() {
        if (Mingle.isUsing('notifications')) {
            let WebpackNotifierPlugin = require('webpack-notifier');

            return new WebpackNotifierPlugin({
                title: 'Ofcold Mingle',
                alwaysNotify: Config.notifications.onSuccess,
                hint: process.platform === 'linux' ? 'int:transient:1' : undefined,
                contentImage: Mingle.paths.root(
                    'node_modules/mingle/icons/inc.png'
                )
            });
        }
    }
}

module.exports = Notifications;
