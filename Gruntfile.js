var path = require("path");
var toCJS = require("steal-tools/lib/build/helpers/cjs");
var toStandalone = require("steal-tools/lib/build/helpers/standalone");

module.exports = function (grunt) {

	grunt.loadNpmTasks('steal-tools');
	
	grunt.initConfig({
		"stealPluginify": {
			"dist": {
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
	
};
