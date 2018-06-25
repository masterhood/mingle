let rally = require('ofcold-rally');

/*
 |--------------------------------------------------------------------------
 | Rally Asset Management
 |--------------------------------------------------------------------------
 |
 | Rally provides a clean, fluent API for defining some Webpack build steps
 | for your Ofcold application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

rally.js('src/app.js', 'dist/').sass('src/app.scss', 'dist/');

// Full API
// rally.js(src, output);
// rally.react(src, output); <-- Identical to rally.js(), but registers React Babel compilation.
// rally.preact(src, output); <-- Identical to rally.js(), but registers Preact compilation.
// rally.coffee(src, output); <-- Identical to rally.js(), but registers CoffeeScript compilation.
// rally.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.rally.js
// rally.extract(vendorLibs);
// rally.sass(src, output);
// rally.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// rally.fastSass('src', output); <-- Alias for rally.standaloneSass().
// rally.less(src, output);
// rally.stylus(src, output);
// rally.postCss(src, output, [require('postcss-some-plugin')()]);
// rally.browserSync('my-site.test');
// rally.combine(files, destination);
// rally.babel(files, destination); <-- Identical to rally.combine(), but also includes Babel compilation.
// rally.copy(from, to);
// rally.copyDirectory(fromDir, toDir);
// rally.minify(file);
// rally.sourceMaps(); // Enable sourcemaps
// rally.version(); // Enable versioning.
// rally.disableNotifications();
// rally.setPublicPath('path/to/public');
// rally.setResourceRoot('prefix/for/resource/locators');
// rally.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// rally.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// rally.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Rally's default.
// rally.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// rally.extend(name, handler) <-- Extend Rally's API with your own components.
// rally.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
