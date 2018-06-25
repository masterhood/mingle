let AutomaticComponent = require('./AutomaticComponent');

class Notifications extends AutomaticComponent {
    /**
     * webpack plugins to be appended to the master config.
     */
    webpackPlugins() {
        if (Rally.isUsing('notifications')) {
            let WebpackNotifierPlugin = require('webpack-notifier');

            return new WebpackNotifierPlugin({
                title: 'Ofcold Rally',
                alwaysNotify: Config.notifications.onSuccess,
                hint: process.platform === 'linux' ? 'int:transient:1' : undefined,
                contentImage: Rally.paths.root(
                    'node_modules/ofcold-rally/icons/ofcold.png'
                )
            });
        }
    }
}

module.exports = Notifications;
