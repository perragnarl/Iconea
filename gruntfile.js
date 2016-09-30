module.exports = function(grunt) {

	var fs = require("fs")
	var path = require('path');
	var filename = '';
	var icons = '';
	var counter = 0;
	var list = function (path) {
	fs.readdirSync(path).forEach(function (file) {
			filename = file.replace('.svg', '');
			icons = icons +
				'<div class="icon-container' + (filename === 'loader-ring' ? ' rotate' : '') + '">' +
					'<svg class="icon">' +
						'<use xlink:href="icons/symbol/svg/sprite.symbol.svg#' + filename + '"></use>' +
					'</svg>' +
					'<span class="search">' + filename + '</span>' +
				'</div>'
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
					from: / fill="[\s\S]*?"/g,
					to: ''
				}]
			},
			build_page: {
				src: ['index.html'],
				overwrite: true,
				replacements: [{
					from: /<main>[\s\S]*?<\/main>/g,
					to: '<main>' + icons + '</main>'
				}, {
					from: /<div class="num">[\s\S]*?<\/div>/g,
					to: counter
				}]
			}
		},
		svg_sprite: {
			main: {
				src: ['icons/*.svg'],
				dest: 'icons/',
				options: {
					shape: {
						id: {
							generator: function(name) {
								// Generate only #fragment-name as id inside svg sprite
								return path.basename(name, '.svg');
							}
						},
						dimension: {
							maxWidth: 96,
							maxHeight: 96,
							attributes: false
						}
					},
					mode: {
						symbol: true
					}
				}
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
	grunt.loadNpmTasks('grunt-svg-sprite');
	grunt.loadNpmTasks('grunt-text-replace');

	grunt.registerTask('default', ['replace', 'svgmin', 'svg_sprite']);

};
