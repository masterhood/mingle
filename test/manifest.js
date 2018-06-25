import test from 'ava';
import rally from '../src/index';
import Manifest from '../src/Manifest';
import fs from 'fs-extra';

test.beforeEach(() => (Rally.manifest = new Manifest()));

test('that it can fetch the underlying manifest object', t => {
    Rally.manifest.add('file/path.js');

    t.deepEqual({ '/file/path.js': '/file/path.js' }, Rally.manifest.get());
});

test('that it can get fetch a single versioned path from the underlying manifest', t => {
    Config.publicPath = 'public';

    Rally.manifest.add('file/path.js');

    t.is('public/file/path.js', Rally.manifest.get('file/path.js'));
});

test('it transforms the generated stats assets to the appropriate format', t => {
    let stats = {
        assetsByChunkName: { '/js/app': ['/js/app.js', 'css/app.css'] }
    };

    Rally.manifest.transform(stats);

    t.deepEqual(
        {
            '/js/app.js': '/js/app.js',
            '/css/app.css': '/css/app.css'
        },
        Rally.manifest.get()
    );
});

test('it can get the underlying manifest object', t => {
    t.deepEqual({}, Rally.manifest.get());
});

test('it knows the path to the underlying file', t => {
    t.is(
        path.join(Config.publicPath, 'rally-manifest.json'),
        Rally.manifest.path()
    );
});

test('it can be refreshed', t => {
    rally.setPublicPath(__dirname);

    new File(Rally.manifest.path()).write('{}');
    new File(path.resolve(__dirname, 'js/app.js'))
        .makeDirectories()
        .write('var foo;');

    // The initial state of the manifest file should be an empty object.
    t.deepEqual({}, Rally.manifest.read());

    // But after we add to the manifest, and then refresh it...
    Rally.manifest.add('js/app.js').refresh();

    // Then the manifest file should be updated on the fs.
    t.deepEqual({ '/js/app.js': '/js/app.js' }, Rally.manifest.read());

    // Cleanup.
    File.find(Rally.manifest.path()).delete();
    fs.removeSync(path.resolve(__dirname, 'js'));
});

test('it sorts files on the underlying manifest object', t => {
    Rally.manifest.add('/path2.js');
    Rally.manifest.add('/path3.js');
    Rally.manifest.add('/path1.js');
    Rally.manifest.add('/path4.js');

    let manifest = Rally.manifest.get();

    t.is(
        ['/path1.js', '/path2.js', '/path3.js', '/path4.js'].join(),
        Object.keys(manifest).join()
    );
});
