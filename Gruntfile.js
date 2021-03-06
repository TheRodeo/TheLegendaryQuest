
module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		customizeBootstrap: {
			build: {
				options: {
					bootstrapPath: 'node_modules/bootstrap',
					local: 'src/manifest.less',
					dest: 'build'
				}
			}
		},
		less: {
			build: {
				files: {
					'build/bootstrap.css': 'build/bootstrap.less'
				}
			}
		},
		ngtemplates: {
			build: {
				src: 'program/*.html',
				cwd: 'src',
				dest: 'build/templates.js',
				options: {
					module: 'legendarySearch',
					htmlmin: {
						collapseBooleanAttributes:      true,
						collapseWhitespace:             true,
						removeAttributeQuotes:          true,
						removeComments:                 true,
						removeEmptyAttributes:          true,
						removeRedundantAttributes:      true,
						removeScriptTypeAttributes:     true,
						removeStyleLinkTypeAttributes:  true
					}
				}
			}
		},
		jshint: {
			dist: {
				src: 'src/program/*.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				mangle: false,
				sourceMap: true,
				compress: {
					drop_console: true
				}
			},
			dist: {
				files: {
					'app.min.js': [
						'node_modules/jquery/dist/jquery.min.js',
						'node_modules/angular/angular.min.js',
						'node_modules/angular-animate/angular-animate.min.js',
						'node_modules/ngstorage/ngStorage.min.js',
						'node_modules/angular-gw2-api/build/gw2api.min.js',
						'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
						'node_modules/bootstrap/js/modal.js',
						'src/program/*.js',
						'build/templates.js'
					]
				}
			}
		},
		cssmin: {
			dist: {
				files: {
					'app.min.css': [
						'build/bootstrap.css',
						'src/style.css',
					]
				}
			}
		},
		processhtml: {
			dist: {
				files: {
					'index.html': 'src/origin-index.html'
				}
			}
		},
		copy: {
			fonts: {
				files: [
					{
						expand: true,
						cwd: 'node_modules/bootstrap/fonts',
						src: ['*'],
						dest: 'build/fonts'
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'node_modules/bootstrap/fonts',
						src: ['*'],
						dest: 'fonts'
					},
					{
						expand: true,
						cwd: 'src/img',
						src: ['*'],
						dest: 'img'
					}
				]
			}
		}
	});

	// Default task(s).
	grunt.registerTask('develop', [
		'customizeBootstrap',
		'copy:fonts',
		'less'
	]);
	
	grunt.registerTask('default', [
		'develop',
		'jshint',
		'ngtemplates',
		'uglify',
		'cssmin',
		'copy:dist',
		'processhtml'
	]);

};