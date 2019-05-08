var fs = require('fs');
var minify = require('uglifycss');
var finder = require('finder-on-steroids');
var ProgressBar = require('progress');

/**
 * Minifies all CSS files in a given folder
 * @param   {string} directory
 */
function recursiveCSSMin(directory) {
    console.log( 'Finding all CSS files' );
    return finder(directory).files().name( '*.css' ).find(launch);
}

function launch(err, files) {
    var bar = new ProgressBar('[:bar] Minified :current of :total files, :percent, :rate/fps, :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: files.length,
        });

    // Do everything synchronously to work around running out of file handles problem
    files.forEach(function(style) {
        fs.writeFileSync(style, minify.processFiles([style]));
        bar.tick();
    });
}

module.exports = recursiveCSSMin;
