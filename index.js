var fs = require('fs');
var minify = require('uglifycss');
var finder = require('finder-on-steroids');
var Promise = require('promise');

var readfile = Promise.denodeify(fs.readFile);
var writefile = Promise.denodeify(fs.writeFile);

function rejected(arg) {
    console.log('REJECTED: ' + arg);
    console.log(arg);
    return Promise.reject('Had an error somewhere');
}

/**
 * Minifies all CSS files in a given folder
 * @param   {string} directory
 * @return  {Promise}
 */
function recursiveCSSMin(directory) {

    return finder(directory).files().name('*.css').find().then(function(styles) {
            return Promise.all(styles.map(function(style) {
                var min = minify.processFiles([style]);
                return writefile(style, minify.processFiles([style])).then(function() {
                    console.log('Minified ' + style);
                    });
            }));
    }).then(null, rejected);

}

module.exports = recursiveCSSMin;
