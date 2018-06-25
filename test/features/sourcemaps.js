import rally from './helpers/setup';

test.serial('rally.sourceMaps()', t => {
    t.false(Config.sourcemaps);

    let response = rally.sourceMaps();

    // Sourcemaps should use a sensible type as the default for dev.
    t.is(rally, response);
    t.is('eval-source-map', Config.sourcemaps);

    // For production builds, we should use a more performant type.
    Config.production = true;
    rally.sourceMaps();
    t.is('source-map', Config.sourcemaps);

    // But if the user specifies that sourcemaps shouldn't be built for
    // production, then we should disable it.
    rally.sourceMaps(false);
    t.false(Config.sourcemaps);
});
