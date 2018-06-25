# JavaScript

```js
rally.js(src|[src], output)
```

With a single line of code, Ofcold Rally allows you to trigger a number of vital actions.

* ES2017 + modules compilation
* Build and compile `.vue` components \(via `vue-loader`\)
* Hot module replacement
* Tree-shaking, new in webpack 2 \(removes unused library code\)
* Extract vendor libraries \(via `rally.extract()`\), for improved long-term caching
* Automatic versioning \(query string hash\), via `rally.version()`


### Usage

```js
let rally = require('ofcold-rally');

// 1. A single src and output path.
rally.js('src/app.js', 'dist/app.js');


// 2. For additional src files that should be
// bundled together:
rally.js([
    'src/app.js',
    'src/another.js'
], 'dist/app.js');


// 3. For multiple entry/output points:
rally.js('src/app.js', 'dist/')
   .js('src/forum.js', 'dist/');
```


### Ofcold Example

Consider a typical Ofcold install. By default, your JavaScript entry point will be located at `./resources/assets/js/app.js`. Let's prepare a `webpack.rally.js` file to compile that to `./public/js/app.js`.

```js
let rally = require('ofcold-rally');

rally.js('resources/assets/js/app.js', 'public/js');
```

Done! Now, all of the bullet items above are available to you, and it required exactly one method call.

To trigger the compilation, run `npm run dev` from the command line.

### Vue Components

Ofcold Rally is mildly opinionated, and ships with compilation support for `.vue` component files. Don't worry: if you don't use Vue, you can ignore this entire section.

Single file components are one of Vue's neatest features. One file to declare the template, script, and styling for a component? Yes, please! Let's try it out.

##### ./resources/assets/js/app.js

```js
import Vue from 'vue';
import Notification from './components/Notification.vue';

new Vue({
    el: '#app',
    components: { Notification }
});
```

Above, we import Vue \(you'll want to first run `npm install vue --save-dev`\), require a `Notification` Vue component, and then build up our root Vue instance.

**./resources/assets/js/components/Notification.vue**

```js
<template>
    <div class="notification">
        {{ body }}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                body: 'I am a notification.'
            }
        }
    }
</script>

<style>
    .notification {
        background: grey;
    }
</style>
```

If you're familiar with Vue, this should all look very familiar, so we'll move on.

**./webpack.rally.js**

```js
let rally = require('ofcold-rally');

rally.js('resources/assets/js/app.js', 'public/js');
```

And that should do it! Run `npm run dev` to compile it all down. At this point, simply create an HTML file, import your `./js/app.js` bundle, and load the browser. Tada!

### React Support

Ofcold Rally also ships with basic React support. Simply update your `rally.js()` call to `rally.react()`, and then use the exact same set of arguments. Behind the scenes, Rally will pull in and reference any necessary Babel plugins for React.

```js
rally.react('resources/assets/js/app.jsx', 'public/js/app.js');
```

Of course, you'll still want to install React and ReactDOM through NPM, per usual, but everything else should be taken care of.
