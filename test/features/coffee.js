import rally from './helpers/setup';

test.serial('rally.coffee()', t => {
    t.is(rally, rally.coffee('resources/assets/js/app.coffee', 'public/js'));
});

test.serial('it applies the correct webpack rules', t => {
    rally.coffee('resources/assets/js/app.coffee', 'public/js');

    t.truthy(
        buildConfig().module.rules.find(
            rule => rule.test.toString() === '/\\.coffee$/'
        )
    );
});

test.cb.serial('it compiles CoffeeScript', t => {
    // Setup.
    new File('test/fixtures/fake-app/resources/assets/js/app.coffee').write(
        'module Foobar'
    );

    rally.coffee('test/fixtures/fake-app/resources/assets/js/app.coffee', 'js');

    compile(t, () => {
        t.true(File.exists('test/fixtures/fake-app/public/js/app.js'));

        t.deepEqual(
            {
                '/js/app.js': '/js/app.js'
            },
            readManifest()
        );

        // Cleanup.
        File.find(
            'test/fixtures/fake-app/resources/assets/js/app.coffee'
        ).delete();
    });
});
