import rally from './helpers/setup';

test.cb.serial('it combines a folder of scripts', t => {
    let output = 'test/fixtures/fake-app/public/all.js';

    rally.scripts('test/fixtures/fake-app/resources/assets/js', output);

    compile(t, () => {
        t.true(File.exists(output));

        t.is(
            "alert('another stub');\n\nalert('stub');\n",
            File.find(output).read()
        );
    });
});

test.cb.serial('it can minify a file', t => {
    rally
        .js('test/fixtures/fake-app/resources/assets/js/app.js', 'js')
        .minify('test/fixtures/fake-app/public/js/app.js');

    compile(t, () => {
        t.true(File.exists('test/fixtures/fake-app/public/js/app.min.js'));

        t.deepEqual(
            {
                '/js/app.js': '/js/app.js',
                '/js/app.min.js': '/js/app.min.js'
            },
            readManifest()
        );
    });
});

test.cb.serial('it compiles JS and then combines the bundles files.', t => {
    rally
        .js('test/fixtures/fake-app/resources/assets/js/app.js', 'js')
        .js('test/fixtures/fake-app/resources/assets/js/another.js', 'js')
        .scripts(
            [
                'test/fixtures/fake-app/public/js/app.js',
                'test/fixtures/fake-app/public/js/another.js'
            ],
            'test/fixtures/fake-app/public/js/all.js'
        );

    compile(t, () => {
        t.true(File.exists('test/fixtures/fake-app/public/js/all.js'));

        t.deepEqual(
            {
                '/js/app.js': '/js/app.js',
                '/js/another.js': '/js/another.js',
                '/js/all.js': '/js/all.js'
            },
            readManifest()
        );
    });
});

test.serial('rally.combine/scripts/styles/babel()', t => {
    t.is(rally, rally.combine([], 'public/js/combined.js'));

    t.is(1, Rally.tasks.length);

    t.is(rally, rally.scripts([], 'public/js/combined.js'));
    t.is(rally, rally.babel([], 'public/js/combined.js'));
});

test.serial('rally.minify()', t => {
    t.is(rally, rally.minify('public/js/minify.js'));

    t.is(1, Rally.tasks.length);
});
