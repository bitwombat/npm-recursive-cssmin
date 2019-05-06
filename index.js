var fs = require('fs');
var minify = require('uglifycss');
var finder = require('finder-on-steroids');

/**
 * Minifies all CSS files in a given folder
 * @param   {string} directory
 */
function recursiveCSSMin(directory) {
    console.log('Reading filenames');
    return finder(directory).files().name('*.css').find().then(function(styles) {
            console.log("Uglifycss'ing the files");
            // Do everything synchronously to work around running out of file handles problem
            styles.forEach(function(style) {
                    console.log(style);
                    fs.writeFileSync(style, minify.processFiles([style]));
                    });

            });
}

module.exports = recursiveCSSMin;
