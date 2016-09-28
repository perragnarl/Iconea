module.exports = function(grunt) {

	var fs = require("fs")
	var files = '';
	var template = '';
	var list = function (path) {
	fs.readdirSync(path).forEach(function (file) {
			template = '<div data-name="' + file + '" class="icon"><img src="icons/' + file + '" width="24" height="24" /><span class="search">' + file + '</span></div>'
			files = files + template
		});
	}
	list('icons')

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
					from: '[icons]',
					to: files
				}]
			}
		},
		svgmin: {
			options: {
				plugins: [
					{
						removeViewBox: false
					}, {
						removeAttrs: {
								attrs: ['xmlns']
						}
					}
				]
			},
			files: [{
				expand: true,
				src: 'icons/**.svg',
				dest: ''
			}]
		}
	});

	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-text-replace');

	grunt.registerTask('default', ['replace'], ['grunt-svgmin']);

};
