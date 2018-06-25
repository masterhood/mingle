# Concatenation and Minification

```js
rally.combine(['src', 'files'], 'destination');
rally.babel(['src', 'files'], destination);
rally.minify('src');
rally.minify(['src']);
```

If used properly, Ofcold Rally and webpack should take care of all the necessary module bundling and minification for you. However, you may have some legacy code or vendor libraries that need to be concatenated and minified. Not a problem.

### Combine Files

Consider the following snippet:

```js
rally.combine(['one.js', 'two.js'], 'merged.js');
```

This will naturally merge `one.js` and `two.js` into a single file, called `merged.js`. As always, during development, that merged file will remain uncompressed. However, for production \(`export NODE_ENV=production`\), this command will additionally minify `merged.js`.

#### Combine Files With Babel Compilation

If you need to concatenate JavaScript files that have been written in ES2015, you may update your `rally.combine()` call to `rally.babel()`. The method signature is identical. The only difference is that, after the files have been concatenated, Ofcold Rally will perform Babel compilation on the result to transform the code to vanilla JavaScript that all browsers can understand.

```js
rally.babel(['one.js', 'two.js'], 'merged.js');
```

### Minify Files

Similarly, you may also minify one or more files with the `rally.minify()` command.

```js
rally.minify('path/to/file.js');
rally.minify(['this/one.js', 'and/this/one.js']);
```

There are a few things worth noting here:

1. This method will create a companion `*.min.ext` file. So minifying `app.js` will generate `app.min.js`.
2. Once again, the minification will only take place during a production build. \(`export NODE_ENV=production`\).
3. There is no need to call `rally.combine(['one.js', 'two.js'], 'merged.js').minify('merged.js');`Just stick with the single `rally.combine()` call. It'll take care of both.

> **Important**: Please note that minification is only available for CSS and JavaScript files. The minifier will not understand any other provided file type.



