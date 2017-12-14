var stealTools = require("steal-tools");

stealTools.export({
	steal: {
		config: "package.json!npm"
	},
	options: {
		sourceMaps: true
	},
	outputs: {
		"+cjs": {},
		"+amd": {},
		"+global-js": {},
		"+global-css": {}
	}
});
