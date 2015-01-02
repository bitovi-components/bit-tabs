import QUnit from "steal-qunit";
import Slider from "can-slider";
import can from "can";
import $ from "jquery";


var template = can.stache("<can-slider></can-slider>");

QUnit.module("can-slider",{
	setup: function(){
		$("#qunit-fixture").append(template());
	}
});

QUnit.test("basics", function(){
	QUnit.ok( $("can-slider").html(), "has text");
});
