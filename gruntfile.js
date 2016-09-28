module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		svgo: {
			main: {
				files: {
					expand: true,
					src: '/icons/**.svg',
					dist: ''
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-svgo');

	grunt.registerTask('default', ['svgo']);

};
