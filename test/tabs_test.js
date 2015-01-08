import QUnit from "steal-qunit";
import {CanPanelVM, CanTabsVM} from "can-tabs";
import can from "can";
import $ from "jquery";

QUnit.module("can-tabs view model");

QUnit.test("basics", function(){
	var tabsVM = new CanTabsVM();
	var panelVM = new CanPanelVM();
	tabsVM.addPanel(panelVM);
	
	equal(panelVM.attr("active"), true, "first panel added is active");
});

var template = can.stache("<can-tabs><can-panel title='First'>Hello!</can-panel></can-tabs>");

QUnit.module("can-tabs component",{
	setup: function(){
		$("#qunit-fixture").append(template());
	}
});

QUnit.test("basics", function(){
	QUnit.equal( $.trim( $("can-tabs ul li").text() ),"First", "has text");
});
