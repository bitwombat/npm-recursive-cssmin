var fs = require('fs');
var minify = require('cssmin');
var finder = require('finder-on-steroids');
var Promise = require('promise');

var readfile = Promise.denodeify(fs.readFile);
var writefile = Promise.denodeify(fs.writeFile);

/**
 * Minifies all CSS files in a given folder
 * @param   {string} directory
 * @return  {Promise}
 */
function recursiveCSSMin(directory) {

	return finder(directory).files().name('*.css').find().then(function(styles) {
		return Promise.all(styles.map(function(style) {
			return readfile(style, {encoding: 'utf-8'}).then(function(data) {
				return writefile(style, minify(data)).then(function() {
					console.log('Minified '+style);
				});
			});
		}));
	});

}

module.exports = recursiveCSSMin;
