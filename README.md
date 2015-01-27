## can-tabs

[![Build Status](https://travis-ci.org/bitovi-components/can-tabs.svg?branch=master)](https://travis-ci.org/bitovi-components/can-tabs)

A tabs widget that can be loaded by:

- StealJS + ES6
- npm / browserify / CJS
- RequireJS / AMD
- Standalone with CanJS and jQuery


## ES6 use

With StealJS, you can import this module directly in a template that is autorendered:

```html
<script type='text/stache' can-autorender>
	<can-import from="can-tabs"/>
	
	<can-tabs>
	    <can-panel title="CanJS">
	      CanJS provides the MV*
	    </can-panel>
	    <can-panel title="StealJS">
	      StealJS provides the infrastructure.
	    </can-panel>
  	</can-tabs>
</script>

<script src='./node_modules/steal/steal.js'
	main="can/view/autorender/"></script>
```

Alternatively, you can import this module like:

```js
import "can-tabs";
import can from "can";
import $ from "jquery";
import stache from "can/view/stache/stache";


var template = stache("<can-tabs>"+
	"<can-panel title='X'>X Content</can-panel>"+
	"<can-panel title='Y'> Y-Content</can-panel>"+
"</can-tabs>");

$("body").append(template());

```


## CJS use

Use `require` to load `can-tabs` and everything else
needed to create a template that uses `can-tabs`:

```js
var can = require("canjs");
var $ = require("jquery");

// Add's can-tabs tag
require("can-tabs");
// Use stache
require("canjs/view/stache/stache");


var template = can.stache("<can-tabs>"+
	"<can-panel title='X'>X Content</can-panel>"+
	"<can-panel title='Y'> Y-Content</can-panel>"+
"</can-tabs>");

$("body").append(template());

```

## AMD use

Configure the `can` and `jquery` paths and the `can-tabs` package:

```html
<script src="require.js"></script>
<script>
	require.config({
	    paths: {
	        "jquery": "node_modules/jquery/dist/jquery",
	        "can": "node_modules/canjs/dist/amd/can"
	    },
	    packages: [{
		    	name: 'can-tabs',
		    	location: 'node_modules/can-tabs/dist/amd',
		    	main: 'lib/can-tabs'
	    }]
	});
	require(["main-amd"], function(){});
</script>
```

Use can-tabs like:

```js
define(["can", "jquery", "can/view/stache","can-tabs"], function(can, $){
	var template = can.stache("<can-tabs>"+
		"<can-panel title='X'>X Content</can-panel>"+
		"<can-panel title='Y'> Y-Content</can-panel>"+
	"</can-tabs>");

	$("body").append(template());
});
```

## Standalone use

Load the `global` css and js files:

```html
<link rel="stylesheet" type="text/css" 
      href="./node_modules/can-tabs/dist/global/can-tabs.css">
      
<script src='./node_modules/jquery/dist/jquery.js'></script>
<script src='./node_modules/canjs/dist/can.jquery.js'></script>
<script src='./node_modules/canjs/dist/can.stache.js'></script>
<script src='./node_modules/can-tabs/dist/global/can-tabs.js'></script>
<script id='main-stache' text='text/stache'>
  <can-tabs>
	<can-panel title='X'>X Content</can-panel>
	<can-panel title='Y'> Y-Content</can-panel>
  </can-tabs>
</script>
<script>
  $("body").append( can.view("main-stache",{}) );
</script>
```
