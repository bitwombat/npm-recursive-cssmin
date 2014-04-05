#!/usr/bin/env node

var recursiveCSSMin = require('../index');

if (process.argv.length != 3) {
	console.log('recursive-uglifyjs: Please enter a (single) directory of scripts to uglify.');
	process.exit(1);
}

recursiveCSSMin(process.argv[2]).then(function() {
	console.log('done!');
}, function() {
	console.log('error!');
	process.exit(1);
});

