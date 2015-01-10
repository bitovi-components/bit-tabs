var path = require("path");
var toCJS = require("steal-tools/lib/build/helpers/cjs");

module.exports = function (grunt) {

	grunt.loadNpmTasks('steal-tools');
	
	grunt.initConfig({
		"stealPluginify": {
			"dist": {
				system: {
					config: "package.json!npm"
				},
				outputs: {
					"cjs": toCJS()
				}
			}
		}
	});
	
};
