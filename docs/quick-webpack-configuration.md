# Quick webpack Configuration

```js
 rally.webpackConfig({} || cb);
```

While, of course, you're free to edit the provided `webpack.config.js` file, in certain settings, it's easier to modify or override the default settings directly from your `webpack.rally.js` file. This is particularly true for Ofcold apps, where, by default, the `webpack.config.js` isn't available in the project root.

As an example, perhaps you want to add a custom array of modules that should be automatically loaded by webpack. You have two options in this scenario:

1. Edit your `webpack.config.js` file, as needed.
2. Call `rally.webpackConfig()` within your `webpack.rally.js` file, and pass your overrides. Rally will then perform a deep merge.

Below, as an example, we'll add a custom module path for Ofcold Spark.

```js
rally.webpackConfig({
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'vendor/ofcold/spark/resources/assets/js')
        ]
    }
});
```

## Using a Callback Function

You can access webpack and all of its properties when passing a callback function.

```js
rally.webpackConfig(webpack => {
    return {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            })
        ]
    };
});
```