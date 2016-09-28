module.exports = function(grunt) {

	var fs = require("fs")
	var filename = '';
	var icons = '';
	var counter = 0;
	var list = function (path) {
	fs.readdirSync(path).forEach(function (file) {
			filename = file.replace('.svg', '');
			icons = icons + '<div class="icon' + (filename === 'loader-ring' ? ' rotate' : '') + '"><img src="icons/' + file + '" width="24" height="24" /><span class="search">' + filename + '</span></div>'
			counter++;
		});
	}
	list('icons');
	counter = '<div class="num">' + counter + ' icons and counting</div>';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		replace: {
			clean_icons: {
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
			build_page: {
				src: ['index.html'],
				overwrite: true,
				replacements: [{
					from: /<div class="icon">.*/g,
					to: icons
				}, {
					from: /<div class="num">.*>/g,
					to: counter
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
