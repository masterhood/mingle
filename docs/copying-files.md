# Copying Files

```js
rally.copy(from, to);
rally.copy('from/regex/**/*.txt', to);
rally.copy([path1, path2], to);
rally.copyDirectory(fromDir, toDir);
```

From time to time, you'll want to copy one or more files, as part of your build process. No problem; that's a cinch. Use the rally.copy\(\) method to specify the source file or folder, and then your desired destination.

```js
rally.copy('node_modules/vendor/acme.txt', 'public/js/acme.txt');
```

Upon compilation, the "acme" file will be copied to `public/js/acme.txt`, accordingly. A common use case for this is when you wish to move a set of fonts, installed through NPM, to your public directory.

