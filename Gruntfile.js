var path = require("path");
var toCJS = require("steal-tools/lib/build/helpers/cjs");
var toStandalone = require("steal-tools/lib/build/helpers/standalone");
var isCI = process.env.CI === 'true';

module.exports = function (grunt) {

	grunt.loadNpmTasks('steal-tools');
	grunt.loadNpmTasks('testee');
	
	grunt.initConfig({
		testee: {
			options: {
				reporter: 'Spec'
			},
			local: {
				options: {
					browsers: ['chrome']
				},
				src: ['test/test.html']
			},
			ci: {
				options: {
					browsers: ['firefox']
				},
				src: ['test/test.html']
			}
		},
		stealPluginify: {
			dist: {
				system: {
					config: "package.json!npm"
				},
				outputs: {
					"cjs": toCJS(),
					"standalone js": toStandalone.js(),
					"standalone css": toStandalone.css()
				}
			}
		}
	});

	grunt.registerTask('test', [ isCI ? 'testee:ci' : 'testee:local' ]);
};
