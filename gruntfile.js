module.exports = function(grunt) {

	var fs = require("fs")
	var files = '';
	var filename = '';
	var template = '';
	var counter = 0;
	var list = function (path) {
	fs.readdirSync(path).forEach(function (file) {
			filename = file.replace('.svg', '');
			template = '<div class="icon"><img src="icons/' + file + '" width="24" height="24" /><span class="search">' + filename + '</span></div>'
			files = files + template
			counter++;
		});
	}
	list('icons');
	files = files + '<div class="num">' + counter + ' icons and counting</div>';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		replace: {
			remove: {
				src: ['icons/*.svg'],
				overwrite: true,
				replacements: [{
					from: /<mask.*\)"\/>/g,
					to: ''
				}, {
					from: ' stroke="none"',
					to: ''
				}, {
					from: ' fill="rgb(69,69,69)"',
					to: ' fill="#454545"'
				}]
			},
			build: {
				src: ['index.html'],
				overwrite: true,
				replacements: [{
					from: /<div data-name.*/g,
					to: files
				}]
			}
		},
		svgmin: {
			options: {
				plugins: [
					{
						removeViewBox: false
					}
				]
			},
			files: {
				expand: true,
				src: 'icons/**.svg',
				dest: ''
			}
		}
	});

	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-text-replace');

	grunt.registerTask('default', ['replace', 'svgmin']);

};
